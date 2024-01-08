import { Progress } from "@nextui-org/react"
import { cn } from "../libs/utils"
import { centerPageClasses } from "../classes"

export default function LoadingPage() {
    return (
        <div className={cn(centerPageClasses, "w-[550px] mx-auto flex-col gap-y-5")}>
            <Progress size="md" isIndeterminate isStriped aria-label="loading page.." color="primary" classNames={{ track: "bg-secBackground" }} />
            <div className="text-2xl text-center font-playfair">Please wait, loading page..</div>
        </div>
    )
}