import React from 'react';
import s from './Table.module.css'

type SiteType = {
  id: number,
  url: string
}
type TestType = {
  id: number,
  name: string,
  type: string,
  status: string,
  siteId: number
}
type TableProps = {
  sites: Array<SiteType>,
  tests: Array<TestType>,
  searchStr: string,
  onThClick: React.MouseEventHandler,
  sorting: {
    by: string,
    order: string
  }
}

function Table({sites, tests, searchStr, onThClick, sorting}: TableProps) {
  function filterTests(tests: TestType[]) {
    return tests.filter(test =>
      test.name.toLowerCase().includes(searchStr.toLowerCase())
    )
  }
  const filteredTests = filterTests(tests)

  function sortTests(tests: TestType[], sortBy: string, sortOrder: string) {
    switch (sortBy) {
      case 'name':
      case 'type':
      case 'siteId':
        // ASC or DESC
        const sortingOrder = sortOrder === 'ASC' ? 1 : -1
        return [...tests]
          .sort((a, b) => {
            const result = a[sortBy] > b[sortBy] ? 1 :
              (a[sortBy] === b[sortBy] ? 0 : -1)
            return result * sortingOrder
          })
      case 'status':
        //  Online, Paused, Stopped, Draft
        const onlineTests = tests.filter(test => test.status === 'ONLINE')
        const pausedTests = tests.filter(test => test.status === 'PAUSED')
        const stoppedTests = tests.filter(test => test.status === 'STOPPED')
        const draftTests = tests.filter(test => test.status === 'DRAFT')
        if (sorting.order === 'ASC') {
          return onlineTests.concat(pausedTests, stoppedTests, draftTests)
        } else {
          return draftTests.concat(stoppedTests, pausedTests, onlineTests)
        }
    }
    return []
  }

  const sortedTests = sortTests(filteredTests, sorting.by, sorting.order)

  const totalTests = sortedTests
  function createSiteList(totalTests: TestType[]) {
    // return ["delivery.company.com", "games.company.com", ...]
    return totalTests
      .reduce((idsSite: number[], test) => {
        idsSite.push(test.siteId)
        return idsSite
      }, [])
      .map(id => {
        const site = sites.find(site => site.id === id)
        if (site) {
          const url = site.url
          return url.match(/(\w+\.){2}com$/)?.[0]
        }
        return ''
      })
  }
  const siteList = createSiteList(totalTests)

  return (
    <div className={s['table-wrap']}>
      {totalTests?.length ?
        <table className={s['table']}>
          <thead>
          <tr className={`${s['tr']} ${s['tr-head']}`} onClick={onThClick}>
            <th className={s['th']}>
              <span className={s['th-text']} data-sort-by="name">Name</span>
            </th>
            <th className={s['th']}>
              <span className={s['th-text']} data-sort-by="type">Type</span>
            </th>
            <th className={s['th']}>
              <span className={s['th-text']} data-sort-by="status">Status</span>
            </th>
            <th className={s['th']}>
              <span className={s['th-text']} data-sort-by="siteId">Site</span>
            </th>
            <th className={s['th']}></th>
          </tr>
          </thead>
          <tbody>
          {
            totalTests?.map((test, i) => {
              return (
                <tr className={`${s['tr']} ${s['tr-content']}`} key={test.id}>
                  <td className={`${s['td']} ${s['name']}`}>
                    {test.name}
                  </td>
                  <td className={`${s['td']} ${s['type']}`}>
                    {test.type}
                  </td>
                  <td className={
                    `${s['td']} ${s['status']} ${s[test.status.toLowerCase()]}`
                  }>
                    {test.status}
                  </td>
                  <td className={`${s['td']} ${s['site']}`}>
                    {siteList[i]}
                  </td>
                  <td className={`${s['td']} ${s['button-wrap']}`}>
                    {test.status === 'DRAFT'
                      ?
                      <button className={s['finalize']}>
                        Finalize
                      </button>
                      :
                      <button className={s['results']}>
                        Results
                      </button>
                    }
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        :
        <div className='no-table'>
          no-table
        </div>
      }
    </div>
  );
}

export default Table;