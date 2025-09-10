"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  // Icon mapping for different toast types
  const getToastIcon = (variant: string) => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 drop-shadow-sm" />
      case "destructive":
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 drop-shadow-sm" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 drop-shadow-sm" />
      default:
        return <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 drop-shadow-sm" />
    }
  }

  return (
    <ToastProvider>
      {/* Enhanced Viewport with liquid glass backdrop */}
      <div className="fixed inset-0 pointer-events-none z-[99]">
        {/* Animated background blur when toasts are active */}
        {toasts.length > 0 && (
          <div className="absolute inset-0 bg-black/5 dark:bg-black/20 backdrop-blur-[0.5px] animate-in fade-in-0 duration-300" />
        )}

        {/* Floating orbs background effect */}
        {toasts.length > 0 && (
          <>
            <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-40 right-32 w-48 h-48 bg-gradient-to-r from-emerald-400/8 to-cyan-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        )}
      </div>

      {toasts.map(({ id, title, description, action, variant = "default", ...props }, index) => (
        <Toast key={id} variant={variant} {...props}>
          {/* Toast content wrapper with enhanced layout */}
          <div className="flex items-start space-x-3 w-full">
            {/* Icon with liquid glass effect */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="relative">
                {/* Icon glow effect */}
                <div className="absolute inset-0 rounded-full bg-current/20 blur-md animate-pulse" />
                <div className="relative z-10">{getToastIcon(variant)}</div>
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 grid gap-1 min-w-0">
              {title && (
                <ToastTitle className="flex items-center gap-2">
                  {title}
                  {/* Progress indicator for toast timing */}
                  <div className="ml-auto flex-shrink-0">
                    <div className="w-8 h-1 bg-white/20 dark:bg-slate-700/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-current/60 rounded-full animate-progress"
                        style={{
                          animation: `progress-shrink ${props.duration || 5000}ms linear forwards`,
                        }}
                      />
                    </div>
                  </div>
                </ToastTitle>
              )}
              {description && <ToastDescription className="pr-2">{description}</ToastDescription>}
            </div>
          </div>

          {/* Action button if provided */}
          {action && <div className="flex-shrink-0 ml-3">{action}</div>}

          {/* Enhanced close button */}
          <ToastClose />

          {/* Stacking effect for multiple toasts */}
          {index > 0 && (
            <div
              className="absolute inset-0 -z-10 rounded-2xl bg-current/5 backdrop-blur-sm"
              style={{
                transform: `translateY(${index * 4}px) scale(${1 - index * 0.02})`,
                opacity: Math.max(0.3, 1 - index * 0.2),
              }}
            />
          )}

          {/* Liquid animation on appear */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 animate-in slide-in-from-right-full duration-500" />

          {/* Subtle pulsing border for active state */}
          <div className="absolute inset-0 rounded-2xl border border-current/10 animate-pulse opacity-50" />
        </Toast>
      ))}

      <ToastViewport />
    </ToastProvider>
  )
}
