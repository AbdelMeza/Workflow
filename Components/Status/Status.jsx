import './Status.css'

export default function Status({ content }) {
    const type = content === "open" ? "grey" :
        content === "cancelled" ? "yellow" :
            content === "in progress" ? "blue" :
                content === "completed" ? "green" :
                    content === "late" ? "red" : null;

    return <>
        <div className={`status flex-c brad-1 ${type}`}>
            <span className="s-fs">{content}</span>
        </div>
    </>
}