import React from 'react';
import s from './Table.module.css'

function Table() {
  return (
    <div className={s['table-wrap']}>
      <table className={s['table']}>
        <thead>
          <tr className={s['tr'] + ' ' + s['tr-head']}>
            <th className={s['th']}>Name</th>
            <th className={s['th']}>Type</th>
            <th className={s['th']}>Status</th>
            <th className={s['th']}>Site</th>
            <th className={s['th']}></th>
          </tr>
        </thead>
        <tbody>
        <tr className={s['tr'] + ' ' + s['tr-content']}>
          <td className={s['td'] + ' ' + s['name']}>Order basket redesing</td>
          <td className={s['td'] + ' ' + s['type']}>Classic</td>
          <td className={s['td'] + ' ' + s['status']}>Online</td>
          <td className={s['td'] + ' ' + s['site']}>market.company.com</td>
          <td className={s['td'] + ' ' + s['button-wrap']}>
            <button className={s['results']}>Results</button>
          </td>
        </tr>
        <tr className={s['tr'] + ' ' + s['tr-content']}>
          <td className={s['td']}>Order basket redesing</td>
          <td className={s['td']}>Classic</td>
          <td className={s['td']}>Online</td>
          <td className={s['td']}>market.company.com</td>
          <td className={s['td']}>
            <button>Results</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;