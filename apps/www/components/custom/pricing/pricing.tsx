import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingComponent() {
  return (
    <div className="container relative">
    <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(211,211,211,0.15),rgba(255,255,255,0))]" />
    <div className="bg-black min-h-screen text-white py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold">
            Get instant access to all components and templates
          </h1>
          <p className="text-gray-400">
            For a one-time payment, you get access to all components and templates, including future updates and new templates.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="space-y-2">
              <div className="text-sm text-gray-400">Basic</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm">$</span>
                <span className="text-5xl font-bold">129</span>
              </div>
              <div className="text-sm text-gray-400">
                <span className="line-through">$199</span>
                <span className="ml-2 text-emerald-500">35% OFF</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-white text-black hover:bg-gray-200">
                Get Basic Pro
              </Button>
              <ul className="space-y-2.5">
                {[
                  "1 year access to all the premium component packs and templates",
                  "1 year of updates and new features",
                  "1 year access to new templates and components",
                  "Access to private discord community",
                  "48 hours turnaround time for support",
                  "Copy and paste, no complexity",
                  "Built with Next.js and React",
                  "Styled with Tailwind CSS and Framer Motion",
                  "Available in TypeScript and JavaScript",
                  "Cancel anytime",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full text-gray-400 hover:text-white">
                Questions? Chat with us.
              </Button>
            </CardFooter>
          </Card>

          {/* Lifetime Plan */}
          <Card className="bg-zinc-900 border-zinc-800 relative">
            <div className="absolute -top-3 right-4 bg-white text-black text-xs px-3 py-1 rounded-full">
              Featured
            </div>
            <CardHeader className="space-y-2">
              <div className="text-sm text-gray-400">Lifetime</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm">$</span>
                <span className="text-5xl font-bold">169</span>
              </div>
              <div className="text-sm text-gray-400">
                <span className="line-through">$299</span>
                <span className="ml-2 text-emerald-500">43% OFF</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-white text-black hover:bg-gray-200">
                Get Lifetime Pro
              </Button>
              <ul className="space-y-2.5">
                {[
                  "Lifetime access to all the premium component packs",
                  "Lifetime access to all the premium templates",
                  "Lifetime access to updates and new features",
                  "Lifetime access to new templates and components",
                  "Access to Figma Kit for all components and templates",
                  "Access to private discord community",
                  "Copy and paste, no complexity",
                  "Built with Next.js and React",
                  "Styled with Tailwind CSS and Framer Motion",
                  "Available in TypeScript and JavaScript",
                  "Priority support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full text-gray-400 hover:text-white">
                Questions? Chat with us.
              </Button>
            </CardFooter>
          </Card>

          {/* Team Plan */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="space-y-2">
              <div className="text-sm text-gray-400">Team</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm">$</span>
                <span className="text-5xl font-bold">790</span>
              </div>
              <div className="text-sm text-gray-400">
                <span className="line-through">$1490</span>
                <span className="ml-2 text-emerald-500">47% OFF</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-white text-black hover:bg-gray-200">
                Get Teams Pro
              </Button>
              <ul className="space-y-2.5">
                {[
                  "10 team members",
                  "Lifetime access to all the component packs and templates",
                  "Lifetime access to updates and new features",
                  "Lifetime access to new templates and components",
                  "Access to private discord community",
                  "Copy and paste, no complexity",
                  "Built with Next.js and React",
                  "Styled with Tailwind CSS and Framer Motion",
                  "Available in TypeScript and JavaScript",
                  "Priority support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full text-gray-400 hover:text-white">
                Questions? Chat with us.
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
}