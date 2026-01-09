import authentificationManagement from "../../Stores/Authentification";

export default function useRole() {
    const { userData } = authentificationManagement();

    return {
        isFreelancer: userData?.role === "freelancer",
        isClient: userData?.role === "client",
        role: userData?.role
    };
}