import { createLazyFileRoute } from '@tanstack/react-router'
import MFASetup from "../../Features/Account/components/MFAMode.tsx";

export const Route = createLazyFileRoute('/_protected/mfa')({
  component: MFAMode,
})

function MFAMode(){
    return (<MFASetup/>)
}