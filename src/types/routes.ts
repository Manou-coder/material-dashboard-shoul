export interface PageProps {
  icon: React.ReactElement
  name: string
  path: string
  element: React.ReactNode
}

export interface RouteAppProps {
  title?: string
  layout: 'dashboard' | 'auth'
  pages: PageProps[]
}
