import './FilterContainer.css'

export default function FilterContainer({ entries }) {
    return <div className="filter-container br bgc-lv3 brad-3 pad-1">
        <div className="filter-type flex flex-d-c gap-2">
            <span className="title s-fs">{entries?.title}</span>
            <div className="filter-items-container flex gap-1">
                {entries?.data.map((d, i) => (
                    <div className="filter-item s-fs h-2 flex-c br brad-2 pad-1" key={i}>{d.value}</div>
                ))}
            </div>
        </div>
    </div>
}