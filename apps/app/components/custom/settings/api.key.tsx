"use client";

import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

export default function ApiKey({apiKey}: {apiKey: string}) {
  const [visible, setVisible] = useState<boolean>(false);

    return (
        <div className="mt-4 flex items-center gap-1">
            <div className={"rounded-md bg-white dark:text-black px-4 py-2 text-sm font-medium border"}>
                <h2 className={`${!visible && "blur-[3px]"}`}>{apiKey}</h2>
            </div>
            <Button onClick={() => (setVisible(!visible))} className="border" variant="default">
                {visible ? <Eye /> : (
                    <EyeOff />
                )}
            </Button>
        </div>
    )
}
