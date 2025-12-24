import './Table.css'

export default function Table({ title, header, data }) {
    return <table className="data-table s-fs" id={title}>
        <thead className="table-header bgc-lv3">
            <tr className="flex-c h-1">
                {header.map((headItem, index) => (
                    <th key={index} className="table-cell header-item st-c">{headItem}</th>
                ))}
            </tr>
        </thead>
        <tbody className="table-body">
            {data.map((dataRow, index) => (
                <tr key={index} className="table-row h-2 flex-c">
                    {dataRow.map((dataItem, index) => (
                        <td key={index} className="table-cell row-item">{dataItem}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
}