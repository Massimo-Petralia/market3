import { useSelector } from "react-redux"
import { ProductRouteProp } from "../../../navigation/navigation-types"
import { ProductDetail } from "./product-detail-view"
import { useRoute } from "@react-navigation/native"
import { selectProducts } from "../../../store/selectors/product-list-selectors"

export const ProductDetailPage = () => {
    const route = useRoute<ProductRouteProp>()
    const {productId, viewMode} = route.params
    const products = useSelector(selectProducts)
    return (
        <>
        <ProductDetail product={products[productId!]}  viewMode={viewMode} />
        </>
    )
}