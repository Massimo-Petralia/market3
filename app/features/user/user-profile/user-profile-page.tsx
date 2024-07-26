import { UserProfile } from "./user-profile-view"
import { selectUserData } from "../../../store/selectors/api-service-selectors"
import { useSelector, UseSelector } from "react-redux"
import { UserAuth } from "../../../../models/models"
import { useDispatch } from "react-redux"

export const UserProfilePage = () => {
    const dispatch = useDispatch()

  
    
    return (
        <>
        <UserProfile  />
        </>
    )
}