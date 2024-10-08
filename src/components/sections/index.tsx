import { FC } from "react";
import SectionWrapper from "./wrapper"
import RecommendedDishes from "../recomended-dishes"
import MoreSelled from "../more-selled"
import AboutUs from "../about-us"
import { useDishes } from "../../hooks/dishes/use-dishes"
import SectionTabs from "./tabs"
import { Stack } from "@mui/material"
import { useCart } from "../../hooks/cart/use-cart";

export const HomeSections: FC = () => {
    const { dishes } = useDishes()
    const { addToCart } = useCart()
    const recommendedDishes = dishes.slice(0, 3)

    return (
        <Stack>
            <SectionTabs />
            <SectionWrapper section="recommendations">
                <RecommendedDishes pratos={recommendedDishes} onAddToCart={addToCart} />
            </SectionWrapper>

            <SectionWrapper section="more-selled">
                <MoreSelled dishes={dishes} onAddToCart={addToCart} />
            </SectionWrapper>

            <SectionWrapper section="about-us">
                <AboutUs />
            </SectionWrapper>
        </Stack>
    )
}