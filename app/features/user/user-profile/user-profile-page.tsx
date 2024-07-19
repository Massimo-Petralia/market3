import { UserProfile } from "./user-profile-view"
import { selectSigninRequestId } from "../../../store/selectors/requestIdList-selectors"
import { selectUserData } from "../../../store/selectors/api-service-selectors"
import { useSelector, UseSelector } from "react-redux"
import { UserAuth } from "../../../../models/models"

export const UserProfilePage = () => {
    const signinRequestId = useSelector(selectSigninRequestId)
    const userData:UserAuth|undefined = useSelector(selectUserData(signinRequestId))
    
    return (
        <>
        <UserProfile userData={userData}/>
        </>
    )
}