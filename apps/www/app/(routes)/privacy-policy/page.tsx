import { TableOfContents } from "@/components/custom/privacy-policy/table-of-contents";
import {
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderHeading,
} from "@/components/custom/text-wrappers";

const privacyPolicySections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <div>
        <p>
          At Vercel, we respect customers&apos; need for privacy. We offer our
          Sites and Services (defined below) to customers and users either
          directly or via a reseller. Where we refer to our
          &quot;Customers&quot; in this Privacy Notice, we refer to customers
          that have entered into an agreement with us or our resellers to use
          the Services (each, an &quot;Agreement&quot;). Each Customers&apos;
          respective website users or applicable visitors are referred to as
          their &quot;End Users&quot;.
        </p>
        <br />
        <p>
          By using or accessing our Sites and Services in any manner, you accept
          the practices and policies outlined in this Privacy Notice and you
          acknowledge that we may process and share your information.
        </p>
      </div>
    ),
  },
  {
    id: "about-vercel",
    title: "About Vercel Products and Services",
    content:
      "Vercel is a frontend cloud for deploying and scaling frontend applications. Our Developer Experience Platform and Managed Infrastructure services provide Customers the ability to build applications and create, share and collaborate on deployments. Customers can preview changes, make Customer content immediately available through our global Edge Network, and test from the perspective of its End Users around the world.\n\nVercel offers tools, workflows, and infrastructure products that Customers need to build and deploy their websites and applications. We may provide relevant privacy-specific information about our products and services in our Documentation.",
  },
  {
    id: "applicability",
    title: "Applicability",
    content: (
      <div>
        <p>
          This Privacy Notice (&quot;Notice&quot;) explains Vercel&apos;s practices regarding
          the collection, use, disclosure, and processing of your information;
          the rights and choices you may have with respect to such information;
          how you may contact us; and how we protect your information when you:
        </p>
        <ul>
          <li className="list-disc">
            Visit Vercel&apos;s websites, such as: vercel.com, nextjs.org,
            turbo.build, and other Vercel affiliated websites, such as blogs,
            event registrations, community discussions, forums, and social media
            platforms (collectively our &ldquo;Sites&quot;);
          </li>
          <li>
            Access or use the products, services, and any related applications
            offered by Vercel, engage directly with us, or use third-party
            partners, products, professional services, or interfaces that employ
            Vercel technology, including our web-based platform, (collectively,
            the &quot;Services&quot;) as a Customer or authorized user, including but not
            limited to:
          </li>
          <ul>
            <li>Host and deploy websites;</li>
            <li>Optimize content and images;</li>
            <li>Develop an integration or template;</li>
            <li>Purchase a domain;</li>
            <li>
              Analyze website performance, track website traffic and metrics;
            </li>
            <li>Scan source code for potential code issues;</li>
            <li>
              Interact with us in any way, including registering for, attending,
              or otherwise partaking in our events, accelerators, learning
              portals, or webinars (collectively, &quot;Marketing Activities&quot;).
            </li>
          </ul>
        </ul>
        <p>This Privacy Notice does not apply to:</p>
        <ul>
          <li>
            Any information that Customers process to provide their services to
            End Users. Customers are solely responsible for ensuring compliance
            with all applicable laws and regulations with respect to their End
            Users, including notifying their End Users of their personal
            information collection, use, and disclosure under their own terms of
            service and privacy policies.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content:
      "The information that we collect depends on your interactions with us, the choices that you make, the products and features you use, your location, and applicable laws. We may collect or receive information directly from you, such as your name and email address when you or your organization sign up for our Services or Marketing Activities. In other cases, we receive information through your use of our Services, such as IP address and telemetry data.",
  },
  {
    id: "information-you-provide-directly",
    title: "Information You Provide Directly",
    content:
      "We collect the following information directly from you when using our Sites and Services:\n\nContact Information. We collect your contact information when you use, inquire about, or purchase our Services or engage in our Marketing Activities. This information may include your full name, email address, phone number, and location.\n\nProfessional Information. We collect professional information about you, including your company name, company website, job title, and industry.\n\nAccount Information. We collect information you provide to us to create, update, or administer your account on the Sites & Services, such as email, phone number, and username. We also provide you the option of submitting a profile picture and social media profiles.\n\nTransactional Information. We collect payment and other transactional information related to our Services, such as hashed payment card values and billing address.\n\nDomain Registration Information. We collect registration data when you purchase a domain, such as domain name and registrant contact information. This data may be made publicly available per ICANN policies.",
  },
  {
    id: "information-from-third-parties",
    title: "Information We Collect from Third Parties",
    content:
      "We receive information about Customers from third parties or Vercel partners that provide services or support our business operations. We limit our use of your information to the purposes described in this Notice. Information that we receive from third parties includes:\n\nOrganization Information. We collect information from referral partners, such as company name, contact name, job title, and company address.\n\nTransaction Information. We collect information from our payment providers and partners, such as fraud metrics (i.e., financial risk scores) and details about failed payments.",
  },
  {
    id: "information-we-collect-automatically",
    title: "Information We Collect Automatically",
    content:
      'When you use or interact with our Sites and Services, we automatically collect or receive certain information about you, your device, and your usage of our Site and Services. This information includes:\n\nUsage Information. We collect information about how you interact with our Sites, Marketing Activities, and Services, such as clicks, pages viewed, searches, web browser used, page response times, errors, date/timestamps associated with your usage, request information (e.g., speed, frequency, the site from which you linked to us ("referring page"), and the name of the website you choose to visit immediately after ours ("exit page").',
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center justify-center pb-8">
      <div className="absolute inset-0 mx-auto h-full w-full bg-[radial-gradient(circle,rgba(211,211,211,0.1),rgba(18,20,22,0.05),rgba(18,20,22,0))] opacity-60" />

      <div className="relative">
        <div className="px-4 md:px-8">
          <SectionHeader className="p-8 sm:p-12 flex flex-col justify-center items-center md:items-center">
            <SectionHeaderHeading className="text-3xl sm:text-4xl">
              Privacy Policy
            </SectionHeaderHeading>
            <SectionHeaderDescription className="text-sm sm:text-base">
              Last updated: 5th January, 2025
            </SectionHeaderDescription>
          </SectionHeader>
        </div>

        <div className="container mx-auto w-11/12 md:w-5/6 ">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 justify-between">
            <main className="col-span-1 md:col-span-2 pb-16 md:pb-32">
              {privacyPolicySections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-20 mb-8"
                >
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                    {section.title}
                  </h2>
                  <div className="text-muted-foreground">{section.content}</div>
                </section>
              ))}
            </main>

            <div className="hidden md:block w-full md:col-span-1 order-first md:order-last md:border-l md:border-dashed pl-5">
              <div className="md:sticky md:top-16 md:h-[calc(100vh-4rem)] overflow-y-auto">
                <TableOfContents sections={privacyPolicySections} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
