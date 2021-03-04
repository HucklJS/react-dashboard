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
  searchStr: string
}

function Table({sites, tests, searchStr}: TableProps) {
  function filterTests(tests: TestType[]) {
    return tests.filter(test =>
      test.name.toLowerCase().includes(searchStr.toLowerCase())
    )
  }
  const filteredTests = filterTests(tests)

  function createSiteList(tests: TestType[]) {
    // return ["delivery.company.com", "games.company.com", ...]
    return tests
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
  const siteList = createSiteList(filteredTests)

  const totalTests = filteredTests

  return (
    <div className={s['table-wrap']}>
      {totalTests.length ?
        <table className={s['table']}>
          <thead>
          <tr className={`${s['tr']} ${s['tr-head']}`}>
            <th className={s['th']}>
              <span className={s['th-text']}>Name</span>
            </th>
            <th className={s['th']}>
              <span className={s['th-text']}>Type</span>
            </th>
            <th className={s['th']}>
              <span className={s['th-text']}>Status</span>
            </th>
            <th className={s['th']}>
              <span className={s['th-text']}>Site</span>
            </th>
            <th className={s['th']}></th>
          </tr>
          </thead>
          <tbody>
          {
            totalTests.map((test, i) => {
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