import './Container.css'

export default function Container({ title, headerTitle, children }) {
    return <div className="container flex flex-d-c gap-2 pad-1 bgc-lv3 br brad-3" id={title}>
        <div className="container-header">
            <span className="header s-fs">{headerTitle}</span>
        </div>
        <div className="content bgc-lv2 br brad-2">
            {children}
        </div>
    </div>
}