import { FC } from "react";
import SectionWrapper from "./wrapper"
import AboutUs from "../about-us"
import { useDishes } from "../../hooks/dishes/use-dishes"
import SectionTabs from "./tabs"
import { Stack } from "@mui/material"
import { useCart } from "../../hooks/cart/use-cart";
import SectionDishes from "../section-dishes";
import { getMoreSelled } from "../../utils/graph";

export const HomeSections: FC = () => {
    const { dishes } = useDishes()
    const { addToCart } = useCart()
    const recommendedDishes = dishes.slice(0, 3)
    const moreSelled = getMoreSelled()
    return (
        <Stack>
            <SectionTabs />
            <SectionWrapper section="recommendations">
                <SectionDishes pratos={recommendedDishes} onAddToCart={addToCart} />
            </SectionWrapper>

            <SectionWrapper section="more-selled">
                <SectionDishes pratos={moreSelled} onAddToCart={addToCart} />
            </SectionWrapper>

            <SectionWrapper section="about-us">
                <AboutUs />
            </SectionWrapper>
        </Stack>
    )
}