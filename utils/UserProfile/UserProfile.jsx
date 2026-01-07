import authentificationManagement from "../../Stores/Authentification"
import './UserProfile.css'

export default function UserProfile({ username }) {
    const { userData } = authentificationManagement()
    const user = username === undefined ? userData.username : username

    return <div className="user-profile flex-c gap-1">
        <span className="default-profile btn-bgc brad-2 flex-c lt-c">{getDefaultProfile(user)}</span>
    </div>
}

function getDefaultProfile(username) {
    let splitedUsername = username.split("")
    let firstLetter = splitedUsername[0]

    return firstLetter
}