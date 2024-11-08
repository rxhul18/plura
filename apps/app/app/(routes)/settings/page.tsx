"use client";
import Infobar from '@/components/custom/infobar/infobar'
import BillingSettings from '@/components/custom/settings/billing.settings';
import ThemeSettings from '@/components/custom/settings/theme.settings';
import React from 'react'

export default function SettingsPage() {
  return (
    <div className='flex flex-col h-full w-full items-start overflow-hidden p-2'>
      <div>
      <Infobar/>
      </div>
      <div className='flex flex-col gap-10'>
      <BillingSettings/>
      <ThemeSettings/>
      </div>
    </div>
  )
}
