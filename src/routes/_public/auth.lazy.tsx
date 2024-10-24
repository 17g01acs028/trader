import { createLazyFileRoute } from '@tanstack/react-router'
import { AuthenticationForm } from '../../Features/Authentication/Components/AuthenticationForm.tsx'
import { Stack } from '@mantine/core'

export const Route = createLazyFileRoute('/_public/auth')({
  component: FileRoute,
})

function FileRoute() {
  return (
    <Stack
      align="center"
      justify="center"
      style={{
        height: '100%',
      }}
    >
      <AuthenticationForm
        style={{
          maxWidth: '490px',
        }}
      />
    </Stack>
  )
}
