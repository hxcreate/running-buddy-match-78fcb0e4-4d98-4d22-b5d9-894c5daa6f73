import { Link } from 'react-router-dom'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'

export function Navigation() {
  const { isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-8">
          <Link to="/" className="font-bold">
            RunTogether
          </Link>
        </div>

        <div className="flex items-center space-x-6 mr-6">
          <Link to="/activities" className="text-sm font-medium transition-colors hover:text-primary">
            Activities
          </Link>
          <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
          {isSignedIn && (
            <Link to="/profile" className="text-sm font-medium transition-colors hover:text-primary">
              Profile
            </Link>
          )}
        </div>

        <div className="flex-1" />

        <div className="flex items-center space-x-4">
          <ModeToggle />
          {!isSignedIn ? (
            <div className="flex items-center space-x-2">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign Up</Button>
              </SignUpButton>
            </div>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </header>
  )
}
