import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">RunBuddy</Link>
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
                  Find Buddy
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-foreground/80 hover:text-foreground transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
