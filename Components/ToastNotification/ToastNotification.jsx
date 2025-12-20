export default function ToastNotification({ content, type }) {
    if (!type || (type !== "error" && type !== "success")) return null
    const [toasts, setToasts] = useState([])
    const lifeTime = 1000

    const addToast = (toast) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

        setToasts((prev) => [...prev, { ...toast, id }])

        setTimeout(() => {
            setToasts((prev) => prev.filter(t => t.id !== id))
        }, lifeTime)
    }

    let icon = null

    switch (type) {
        case "error":
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" className="toast-icon error-icon" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
            )
            break

        case "success":
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" className="toast-icon success-icon" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            )
            break

        default:
            return null
    }

    return (
        <div className="toast-notifications-container">
            <div className={`toast-notification ${type}`}>
                <div className="icon-container">{icon}</div>
                <div className="content">{content}</div>
            </div>
        </div>
    )
}
