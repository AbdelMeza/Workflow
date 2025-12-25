export function getTimeRemaining(deadline) {
    const now = new Date()
    const end = new Date(deadline)

    const diffMs = end - now

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )

    if(diffDays > 7) return false
    if(diffDays < 0) return false

    if (diffDays > 0) return `${diffDays}j ${diffHours}h`
    return `${diffHours}h`
}
