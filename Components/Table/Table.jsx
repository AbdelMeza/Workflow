import './Table.css'

export default function Table({ tableData, title }) {
    return <div className="data-table flex s-fs br brad-2" id={title}>
        {tableData && tableData.length > 0 ?
            Object.keys(tableData[0]).map((items, index) => (
                <div className="table-column flex flex-d-c s-fs" key={index}>
                    <div className="column-header bgc-lv3 h-2">
                        <span className="header-item s-fs st-c">
                            {items}
                        </span>
                    </div>
                    <div className="column-data flex flex-d-c">
                        {tableData.map((dataItem, index) => (
                            <span className="data-item mt-c s-fs h-2" key={index}>
                                {dataItem[items]}
                            </span>
                        ))}
                    </div>
                </div>
            )) : <code className="empty-data s-fs st-c pad-3">No project found</code>}
    </div>
}