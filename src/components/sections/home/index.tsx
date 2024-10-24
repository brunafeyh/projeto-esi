import { FC } from "react";
import SectionWrapper from "./wrapper"
import SectionTabs from "./tabs"
import { Stack } from "@mui/material"
import { useDishes } from "../../../hooks/dishes/use-dishes";
import { useCart } from "../../../hooks/cart/use-cart";
import { getMoreSelled } from "../../../utils/graph";
import SectionDishes from "../../section-dishes";
import AboutUs from "../../about-us";
import Loading from "../../loading";

export const HomeSections: FC = () => {
    const { dishes, isLoading } = useDishes()
    const { addToCart } = useCart()
    const recommendedDishes = dishes.slice(0, 3)
    const moreSelled = getMoreSelled()
    if (isLoading) return <Loading />
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