import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Homepage', () => {
  it('renders a heading', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })

  it('renders the correct text', () => {
    render(<App />)

    expect(
      screen.getByText('Vite + Shadcn Starter Template')
    ).toBeInTheDocument()
  })

  it('renders a button on the homepage', () => {
    render(<App />)

    const button = screen.getByRole('button', {
      name: 'Get started'
    })

    expect(button).toBeInTheDocument()
  })

  it('renders a link to my website', () => {
    render(<App />)

    const link = screen.getByRole('link', {
      name: 'Visit my website'
    })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://www.damilolabada.com')
  })
})
