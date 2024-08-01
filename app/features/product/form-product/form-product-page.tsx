import { FormProduct } from "./form-product-view"
import { productThunks } from "../../../store/slices/product-slice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../store/store"
import { selectUserId } from "../../../store/selectors/user-selectors"
import { Product } from "../../../../models/models"
import { selectProductDetail, selectLoadingState } from "../../../store/selectors/product-selectors"

export const FormProductPage = () => {
    const dispatch: AppDispatch = useDispatch()
    const userId = useSelector(selectUserId)
    const product = useSelector(selectProductDetail)
    const loadingState = useSelector(selectLoadingState)
    const onCreateProduct = (product: Product) => {
        dispatch(productThunks.createProductThunks({...product, userId}))
    }
    return (
        <>
        <FormProduct onCreateProduct={onCreateProduct} product={product} loadingState={loadingState}/>
        </>
    )
}