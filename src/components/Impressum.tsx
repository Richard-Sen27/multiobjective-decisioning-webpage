import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

export default function Impressum() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Imprint</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Imprint</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Information according to § 5 TMG
                </DialogDescription>
                <div>
                    <p>Richard Senger</p>
                    <p>Spengergasse 20</p>
                    <p>1050 Wien</p>
                    <p>sen210607@spengergasse.at</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}