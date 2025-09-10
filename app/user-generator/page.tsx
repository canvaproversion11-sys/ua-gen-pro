"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Zap, Sparkles, Loader2, CheckCircle, AlertTriangle, X, Cpu, Copy, Download } from "lucide-react"

import {
  DeviceModel,
  IOSVersion,
  AppVersion,
  Configuration,
  BlacklistedUserAgent,
  AndroidDeviceModel,
  AndroidBuildNumber,
  AndroidAppVersion,
  InstagramDeviceModel,
  InstagramVersion,
  ChromeVersion,
  ResolutionDpi,
  AccessKey,
  UserGeneration,
  AdminNotice,
} from "@/lib/supabase"

// Enhanced Progress Modal Component
function ProgressModal({ isOpen, title, message, progress, onCancel, showCancel = false, type = "info" }) {
  const [pulseAnimation, setPulseAnimation] = useState(0)

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setPulseAnimation((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  if (!isOpen) return null

  const iconMap = {
    info: Loader2,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertTriangle,
  }

  const colorMap = {
    info: "text-blue-500",
    success: "text-green-500",
    warning: "text-amber-500",
    error: "text-red-500",
  }

  const Icon = iconMap[type]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={!showCancel ? undefined : onCancel} />
      <div className="relative z-10 w-full max-w-lg transform transition-all duration-500 animate-in zoom-in-95">
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

          <div className="px-6 py-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                  <Icon
                    className={`w-6 h-6 ${colorMap[type]} ${type === "info" ? "animate-spin" : ""}`}
                    style={{ animationDuration: type === "info" ? "2s" : "1s" }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                          style={{
                            animationDelay: `${i * 0.2}s`,
                            animationDuration: "1s",
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{pulseAnimation} সেকেন্ড চলছে...</span>
                  </div>
                </div>
              </div>
              {showCancel && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCancel}
                  className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="px-6 py-6 bg-white dark:bg-slate-800">
            <p className="text-slate-700 dark:text-slate-300 mb-6 text-base">{message}</p>
            {progress !== undefined && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    প্রগ্রেস
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
                </div>
                <div className="relative">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{
                          animation: "shimmer 2s ease-in-out infinite",
                          transform: "translateX(-100%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>উচ্চ গতি</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full" />
                  <div className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 animate-spin text-blue-500" style={{ animationDuration: "3s" }} />
                    <span>প্রসেসিং...</span>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                <Sparkles className="w-4 h-4" />
                <span>💡 টিপস: প্রতিটি ইউজার এজেন্ট ইউনিক এবং সম্পূর্ণ বৈধ হবে!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}

export default function UserGeneratorPage() {
  const [userAgents, setUserAgents] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [platform, setPlatform] = useState("")
  const [appType, setAppType] = useState("")
  const [quantity, setQuantity] = useState(100)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [history, setHistory] = useState([])
  const [notices, setNotices] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [activeSection, setActiveSection] = useState("generator")
  const [generatedUserAgents, setGeneratedUserAgents] = useState([])

  // Modal states
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: () => {},
    showCancel: false,
  })

  const [progressModal, setProgressModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    progress: 0,
    type: "info",
    showCancel: false,
  })

  // Data for generation
  const [deviceModels, setDeviceModels] = useState([])
  const [iosVersions, setIosVersions] = useState([])
  const [appVersions, setAppVersions] = useState([])
  const [configurations, setConfigurations] = useState({})
  const [blacklistedUAs, setBlacklistedUAs] = useState(new Set())
  const [androidDeviceModels, setAndroidDeviceModels] = useState([])
  const [androidBuildNumbers, setAndroidBuildNumbers] = useState([])
  const [androidAppVersions, setAndroidAppVersions] = useState([])
  const [instagramDeviceModels, setInstagramDeviceModels] = useState([])
  const [instagramVersions, setInstagramVersions] = useState([])
  const [chromeVersions, setChromeVersions] = useState([])
  const [resolutionDpis, setResolutionDpis] = useState([])

  const [allCopied, setAllCopied] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)

  useEffect(() => {
    checkAuthentication()
    loadData()
    loadUserHistory()
  }, [])

  useEffect(() => {
    if (currentUser) {
      loadNotices()
    }
  }, [currentUser])

  const checkAuthentication = () => {
    const user = AccessKey.getCurrentUser()
    if (!user) {
      window.location.href = "/login"
      return
    }

    if (user.user_role === "admin") {
      window.location.href = "/admin"
      return
    }

    setCurrentUser(user)
  }

  const showModal = (title, message, type = "info", onConfirm = () => {}, showCancel = false) => {
    setModal({
      isOpen: true,
      title,
      message,
      type,
      onConfirm,
      showCancel,
    })
  }

  const showProgressModal = (title, message, progress = 0, type = "info", showCancel = false) => {
    setProgressModal({
      isOpen: true,
      title,
      message,
      progress,
      type,
      showCancel,
    })
  }

  const hideProgressModal = () => {
    setProgressModal((prev) => ({ ...prev, isOpen: false }))
  }

  const loadData = async () => {
    try {
      const [
        devices,
        ios,
        apps,
        configs,
        blacklisted,
        androidDevices,
        androidBuilds,
        androidApps,
        instagramDevices,
        instagramVers,
        chromeVers,
        resDpis,
      ] = await Promise.all([
        DeviceModel.list(),
        IOSVersion.list(),
        AppVersion.list(),
        Configuration.list(),
        BlacklistedUserAgent.list(),
        AndroidDeviceModel.list(),
        AndroidBuildNumber.list(),
        AndroidAppVersion.list(),
        InstagramDeviceModel.list(),
        InstagramVersion.list(),
        ChromeVersion.list(),
        ResolutionDpi.list(),
      ])

      setDeviceModels(devices.filter((d) => d.is_active))
      setIosVersions(ios.filter((v) => v.is_active))
      setAppVersions(apps.filter((a) => a.is_active))
      setAndroidDeviceModels(androidDevices.filter((d) => d.is_active))
      setAndroidBuildNumbers(androidBuilds.filter((b) => b.is_active))
      setAndroidAppVersions(androidApps.filter((a) => a.is_active))
      setInstagramDeviceModels(instagramDevices.filter((d) => d.is_active))
      setInstagramVersions(instagramVers.filter((v) => v.is_active))
      setChromeVersions(chromeVers.filter((v) => v.is_active))
      setResolutionDpis(resDpis.filter((r) => r.is_active))

      const configsObj = {}
      configs.forEach((config) => {
        try {
          configsObj[config.config_key] = JSON.parse(config.config_value)
        } catch (e) {
          configsObj[config.config_key] = config.config_value
        }
      })
      setConfigurations(configsObj)

      const blacklistSet = new Set(blacklisted.map((b) => b.user_agent))
      setBlacklistedUAs(blacklistSet)
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const loadUserHistory = async () => {
    if (!currentUser) return

    try {
      setIsLoadingHistory(true)
      const userHistory = await UserGeneration.getUserHistory(currentUser.access_key, 20)
      setHistory(userHistory)
    } catch (error) {
      console.error("Error loading user history:", error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const loadNotices = async () => {
    if (!currentUser) return

    try {
      const activeNotices = await AdminNotice.getActiveNotices(currentUser.user_name)
      setNotices(activeNotices)
    } catch (error) {
      console.error("Error loading notices:", error)
    }
  }

  const handleGenerate = async () => {
    if (isGenerating) return

    if (!currentUser) return

    if (!AccessKey.canGenerate(currentUser)) {
      showModal(
        "⚠️ লিমিট শেষ!",
        `আপনার জেনারেশন লিমিট শেষ হয়ে গেছে। বর্তমান লিমিট: ${currentUser.generation_limit}`,
        "warning",
      )
      return
    }

    if (!platform) {
      showModal("⚠️ প্ল্যাটফর্ম নির্বাচন করুন!", "অনুগ্রহ করে একটি প্ল্যাটফর্ম নির্বাচন করুন।", "warning")
      return
    }

    if (!appType) {
      showModal("⚠️ অ্যাপ টাইপ নির্বাচন করুন!", "অনুগ্রহ করে একটি অ্যাপ টাইপ নির্বাচন করুন।", "warning")
      return
    }

    const remainingGenerations = AccessKey.getRemainingGenerations(currentUser)
    const requestedQuantity = Math.min(quantity, remainingGenerations === "Unlimited" ? quantity : remainingGenerations)

    if (requestedQuantity < 1) {
      showModal("⚠️ লিমিট শেষ!", "আপনার আর কোন জেনারেশন বাকি নেই।", "warning")
      return
    }

    if (requestedQuantity < quantity) {
      showModal(
        "⚠️ লিমিট সীমাবদ্ধতা",
        `আপনি ${quantity}টি চেয়েছেন কিন্তু শুধু ${requestedQuantity}টি জেনারেট করা যাবে।`,
        "warning",
        () => {
          setModal((prev) => ({ ...prev, isOpen: false }))
          performGeneration(requestedQuantity)
        },
        true,
      )
      return
    }

    performGeneration(requestedQuantity)
  }

  const performGeneration = async (actualQuantity) => {
    if (!currentUser) {
      showModal("❌ অনুমতি নেই!", "আপনি লগইন করেননি।", "error")
      return
    }

    const validationResult = validateDataForGeneration()
    if (!validationResult.isValid) {
      showModal("❌ ডেটা সমস্যা!", validationResult.message, "error")
      return
    }

    if (!AccessKey.canGenerate(currentUser)) {
      showModal("❌ জেনারেশন সীমা শেষ!", "আপনার দৈনিক জেনারেশন সীমা শেষ হয়ে গেছে। আগামীকাল আবার চেষ্টা করুন।", "error")
      return
    }

    if (actualQuantity < 1 || actualQuantity > 100) {
      showModal("❌ ভুল পরিমাণ!", "১ থেকে ১০০ এর মধ্যে সংখ্যা দিন।", "error")
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)
    setProgressModal({
      isOpen: true,
      title: "🚀 জেনারেশন চলছে...",
      message: "অনুগ্রহ করে অপেক্ষা করুন...",
      progress: 0,
    })

    try {
      const newUserAgents = []
      const batchSize = 10
      const totalBatches = Math.ceil(actualQuantity / batchSize)

      console.log("[v0] Starting generation with validation and duplicate check")
      console.log("[v0] Blacklisted UAs count:", blacklistedUAs.size)

      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const startIndex = batchIndex * batchSize
        const endIndex = Math.min(startIndex + batchSize, actualQuantity)
        const currentBatchSize = endIndex - startIndex

        const batchPromises = []
        for (let i = 0; i < currentBatchSize; i++) {
          const globalIndex = startIndex + i
          batchPromises.push(
            generateUserAgent(platform, appType)
              .then((userAgent) => ({
                success: true,
                userAgent,
                index: globalIndex,
              }))
              .catch((error) => ({
                success: false,
                error: error.message,
                index: globalIndex,
              })),
          )
        }

        const batchResults = await Promise.all(batchPromises)

        for (const result of batchResults) {
          if (result.success && result.userAgent) {
            if (!blacklistedUAs.has(result.userAgent)) {
              newUserAgents.push({
                id: Date.now() + result.index,
                userAgent: result.userAgent,
                platform,
                appType,
                generatedAt: new Date().toISOString(),
              })
            } else {
              console.log("[v0] Skipped duplicate user agent:", result.userAgent.substring(0, 50) + "...")
            }
          } else if (result.error) {
            console.error("[v0] Generation error:", result.error)
          }
        }

        const progress = Math.round(((batchIndex + 1) / totalBatches) * 100)
        setGenerationProgress(progress)
        setProgressModal((prev) => ({
          ...prev,
          progress,
          message: `✨ ${newUserAgents.length}/${actualQuantity} ইউজার এজেন্ট তৈরি হয়েছে...`,
        }))

        if (batchIndex < totalBatches - 1) {
          await new Promise((resolve) => setTimeout(resolve, 50))
        }
      }

      setProgressModal((prev) => ({ ...prev, isOpen: false }))

      if (newUserAgents.length === 0) {
        showModal("❌ জেনারেশন ব্যর্থ!", "কোন নতুন ইউজার এজেন্ট তৈরি করা যায়নি। সব ইউজার এজেন্ট ইতিমধ্যে ব্যবহৃত হয়েছে।", "error")
        return
      }

      await AccessKey.incrementGeneration(currentUser.access_key)

      // Add new user agents to blacklist to prevent future duplicates
      const blacklistPromises = newUserAgents.map((ua) =>
        BlacklistedUserAgent.create({
          user_agent: ua.userAgent,
          hash: btoa(ua.userAgent).substring(0, 32),
          downloaded_by: currentUser.user_name,
          app_type: appType,
        }),
      )

      await Promise.all(blacklistPromises)

      // Update local blacklist set
      newUserAgents.forEach((ua) => blacklistedUAs.add(ua.userAgent))

      setUserAgents(newUserAgents.map((ua) => ua.userAgent))
      setGeneratedUserAgents(newUserAgents)
      setIsGenerating(false)

      showModal("✅ জেনারেশন সফল!", `${newUserAgents.length}টি ইউজার এজেন্ট সফলভাবে তৈরি হয়েছে।`, "success", async () => {
        console.log("[v0] Modal OK button clicked - starting cleanup")
        setModal((prev) => ({ ...prev, isOpen: false }))
        await loadData() // Refresh data to update remaining generations and blacklist
        console.log("[v0] Generation completed, data refreshed, blacklist updated")
      })

      console.log("[v0] Generation completed successfully:", newUserAgents.length)
    } catch (error) {
      console.error("[v0] Generation failed:", error)
      setProgressModal((prev) => ({ ...prev, isOpen: false }))
      setIsGenerating(false)

      showModal("❌ জেনারেশন ব্যর্থ!", `ইউজার এজেন্ট তৈরি করতে সমস্যা হয়েছে: ${error.message}`, "error")
    }
  }

  const validateDataForGeneration = () => {
    console.log("[v0] Validating data for generation...")
    console.log("[v0] Platform:", platform, "AppType:", appType)

    if (platform === "iOS") {
      if (!deviceModels || deviceModels.length === 0) {
        return { isValid: false, message: "iOS device models data missing. Please contact admin." }
      }
      if (!iosVersions || iosVersions.length === 0) {
        return { isValid: false, message: "iOS versions data missing. Please contact admin." }
      }
      if (!appVersions || appVersions.length === 0) {
        return { isValid: false, message: "App versions data missing. Please contact admin." }
      }
    } else if (platform === "Android") {
      if (appType === "Instagram") {
        if (!instagramDeviceModels || instagramDeviceModels.length === 0) {
          return { isValid: false, message: "Instagram device models data missing. Please contact admin." }
        }
        if (!instagramVersions || instagramVersions.length === 0) {
          return { isValid: false, message: "Instagram versions data missing. Please contact admin." }
        }
        if (!chromeVersions || chromeVersions.length === 0) {
          return { isValid: false, message: "Chrome versions data missing. Please contact admin." }
        }
      } else if (appType === "Facebook") {
        if (!androidDeviceModels || androidDeviceModels.length === 0) {
          return { isValid: false, message: "Android device models data missing. Please contact admin." }
        }
        if (!androidBuildNumbers || androidBuildNumbers.length === 0) {
          return { isValid: false, message: "Android build numbers data missing. Please contact admin." }
        }
        if (!androidAppVersions || androidAppVersions.length === 0) {
          return { isValid: false, message: "Android app versions data missing. Please contact admin." }
        }
      }
    }

    console.log("[v0] Data validation passed")
    return { isValid: true, message: "All data is valid" }
  }

  const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const extractModelIdentifier = (modelName) => {
    if (!modelName) return modelName
    const match = modelName.match(/^([^\s(]+)/)
    return match ? match[1] : modelName
  }

  const generateAndroidInstagramUserAgent = async () => {
    try {
      console.log("[v0] Generating Android Instagram user agent...")

      if (!instagramDeviceModels.length) {
        console.error("[v0] No Instagram device models available")
        return null
      }
      if (!instagramVersions.length) {
        console.error("[v0] No Instagram versions available")
        return null
      }
      if (!chromeVersions.length) {
        console.error("[v0] No Chrome versions available")
        return null
      }

      const versionPairs = {
        "11": "30/11",
        "12": "31/12",
        "13": "33/13",
        "14": "34/14",
        "15": "35/15",
      }

      const buildNumbers = {
        "11": "RP1A.200720.012",
        "12": "SP1A.210812.016",
        "13": "TP1A.220624.014",
        "14": "UP1A.231005.007",
        "15": "AP3A.240905.015.A2",
      }

      const languageConfig = configurations.languages
      if (!languageConfig) {
        throw new Error("Language configuration not found in database. Please configure languages in admin panel.")
      }

      // Parse language percentages from database
      let languagePercentages: { [key: string]: number }
      try {
        languagePercentages = typeof languageConfig === "string" ? JSON.parse(languageConfig) : languageConfig
      } catch (error) {
        throw new Error("Invalid language configuration format in database")
      }

      // Weighted random selection based on percentages
      const getWeightedRandomLanguage = (percentages: { [key: string]: number }) => {
        const random = Math.random() * 100
        let cumulative = 0

        for (const [lang, percentage] of Object.entries(percentages)) {
          cumulative += percentage
          if (random <= cumulative) {
            return lang
          }
        }

        // Fallback to first language if something goes wrong
        return Object.keys(percentages)[0]
      }

      const device = instagramDeviceModels[Math.floor(Math.random() * instagramDeviceModels.length)]
      const androidVersion = device.android_version.toString()
      const versionPair = versionPairs[androidVersion]
      const buildNumber = buildNumbers[androidVersion]

      if (!versionPair || !buildNumber) {
        console.error(`[v0] No version pair or build number for Android ${androidVersion}`)
        return null
      }

      const resolutions = Array.isArray(device.resolutions)
        ? device.resolutions
        : device.resolutions.split(",").map((r) => r.trim())
      const resolution = resolutions[Math.floor(Math.random() * resolutions.length)]

      const matchingDpis = resolutionDpis.filter((rd) => rd.resolution === resolution)
      const dpiOptions = matchingDpis.length > 0 ? matchingDpis[0].dpis.map((d) => `${d}dpi`) : ["420dpi"]
      const dpi = dpiOptions[Math.floor(Math.random() * dpiOptions.length)]

      const language = getWeightedRandomLanguage(languagePercentages)
      const instagramVersion = instagramVersions[Math.floor(Math.random() * instagramVersions.length)]
      const chromeVersion = chromeVersions[Math.floor(Math.random() * chromeVersions.length)]

      const userAgent =
        `Mozilla/5.0 (Linux; Android ${androidVersion}; ${device.model} Build/${buildNumber}; wv) ` +
        `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/${chromeVersion.version} Mobile Safari/537.36 ` +
        `Instagram ${instagramVersion.version} Android (${versionPair}; ${dpi}; ${resolution}; ${device.manufacturer}; ` +
        `${device.model}; ${device.code}; ${device.chipset}; ${language}; ${instagramVersion.unique_id}; IABMV/1)`

      console.log("[v0] Successfully generated Android Instagram user agent")
      return userAgent
    } catch (error) {
      console.error("[v0] Error generating Instagram Android user agent:", error)
      return null
    }
  }

  const generateAndroidUserAgent = async () => {
    try {
      if (appType === "instagram") {
        return await generateAndroidInstagramUserAgent()
      }

      console.log("[v0] Generating Android Facebook user agent...")

      const device = androidDeviceModels[Math.floor(Math.random() * androidDeviceModels.length)]
      if (!device) {
        console.error("[v0] No Android device models available")
        return null
      }

      const buildNumber = androidBuildNumbers.find((b) => b.android_version === device.android_version)
      if (!buildNumber) {
        console.error(`[v0] No build number found for Android ${device.android_version}`)
        return null
      }

      const fbVersions = androidAppVersions.filter((a) => a.app_type === "facebook")
      const chromeVersions = androidAppVersions.filter((a) => a.app_type === "chrome")

      if (fbVersions.length === 0) {
        console.error("[v0] No Facebook versions available")
        return null
      }
      if (chromeVersions.length === 0) {
        console.error("[v0] No Chrome versions available")
        return null
      }

      const fbVersion = fbVersions[Math.floor(Math.random() * fbVersions.length)]
      const chromeVersion = chromeVersions[Math.floor(Math.random() * chromeVersions.length)]
      const modelIdentifier = extractModelIdentifier(device.model_name)

      const userAgent =
        `Mozilla/5.0 (Linux; ${device.android_version}; ${modelIdentifier} Build/${buildNumber.build_number}) ` +
        `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 ` +
        `Chrome/${chromeVersion.version} Mobile Safari/537.36 ` +
        `[FB_IAB/FB4A;FBAV/${fbVersion.version};IABMV/${fbVersion.iabmv};]`

      console.log("[v0] Successfully generated Android Facebook user agent")
      return userAgent
    } catch (error) {
      console.error("[v0] Error generating Android user agent:", error)
      return null
    }
  }

  const generateIOSUserAgent = async () => {
    console.log("[v0] Generating iOS user agent...")

    const DEVICE_MODELS = [
      "iPhone 16 Pro Max",
      "iPhone 16 Pro",
      "iPhone 16 Plus",
      "iPhone 16",
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15 Plus",
      "iPhone 15",
      "iPhone 14 Pro Max",
      "iPhone 14 Pro",
      "iPhone 14 Plus",
      "iPhone 14",
      "iPhone 13 Pro Max",
      "iPhone 13 Pro",
      "iPhone 13 mini",
      "iPhone 13",
      "iPhone 12 Pro Max",
      "iPhone 12 Pro",
      "iPhone 12 mini",
      "iPhone 12",
      "iPhone 11 Pro Max",
      "iPhone 11 Pro",
      "iPhone 11",
    ]

    try {
      let deviceModels = await DeviceModel.list()

      // If no device models in database, use hardcoded fallback
      if (!deviceModels || deviceModels.length === 0) {
        console.log("[v0] No device models in database, using hardcoded fallback")
        deviceModels = DEVICE_MODELS.map((model) => ({ model_name: model }))
      }

      if (deviceModels.length === 0) {
        console.log("[v0] No iOS device models available")
        return null
      }

      const iosVersions = await IOSVersion.list()
      const appVersions = await AppVersion.list()

      if (iosVersions.length === 0 || appVersions.length === 0) {
        console.log("[v0] Missing iOS versions or app versions")
        return null
      }

      const device = getRandomElement(deviceModels)
      if (!device) {
        console.error("[v0] No iOS device models available")
        return null
      }

      const validIOSVersions = iosVersions.filter((ios) => {
        const versionCompareMin = compareVersions(ios.version, device.min_ios_version)
        const versionCompareMax = compareVersions(ios.version, device.max_ios_version)
        return versionCompareMin >= 0 && versionCompareMax <= 0
      })

      if (validIOSVersions.length === 0) {
        console.warn(`[v0] No valid iOS versions for device ${device.model_name}, retrying...`)
        return generateUserAgent()
      }

      const iosVersion = getRandomElement(validIOSVersions)
      const appVersionsForType = appVersions.filter((app) => app.app_type === appType)

      if (appVersionsForType.length === 0) {
        console.error(`[v0] No app versions available for ${appType}`)
        return null
      }

      const appVersion = getRandomElement(appVersionsForType)

      const languageConfig = configurations.languages
      if (!languageConfig) {
        throw new Error("Language configuration not found in database. Please configure languages in admin panel.")
      }

      // Parse language percentages from database
      let languagePercentages: { [key: string]: number }
      try {
        languagePercentages = typeof languageConfig === "string" ? JSON.parse(languageConfig) : languageConfig
      } catch (error) {
        throw new Error("Invalid language configuration format in database")
      }

      // Weighted random selection based on percentages
      const getWeightedRandomLanguage = (percentages: { [key: string]: number }) => {
        const random = Math.random() * 100
        let cumulative = 0

        for (const [lang, percentage] of Object.entries(percentages)) {
          cumulative += percentage
          if (random <= cumulative) {
            return lang
          }
        }

        // Fallback to first language if something goes wrong
        return Object.keys(percentages)[0]
      }

      const language = getWeightedRandomLanguage(languagePercentages)

      const userAgent =
        `Mozilla/5.0 (iPhone; CPU iPhone OS ${iosVersion.version} like Mac OS X) ` +
        `AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${iosVersion.version} ` +
        `Mobile/15E148 Safari/604.1 (${appVersion.app_type} ${appVersion.version}; ` +
        `gzip)`

      console.log("[v0] Successfully generated iOS user agent")
      return userAgent
    } catch (error) {
      console.error("[v0] Error generating iOS user agent:", error)
      return null
    }
  }

  const generateUserAgent = async (platform, appType) => {
    if (platform === "iOS") {
      return await generateIOSUserAgent()
    } else if (platform === "Android") {
      return await generateAndroidUserAgent()
    }
    return null
  }

  const compareVersions = (version1, version2) => {
    const v1Parts = version1.split(".").map(Number)
    const v2Parts = version2.split(".").map(Number)
    for (let i = 0; i < Math.min(v1Parts.length, v2Parts.length); i++) {
      if (v1Parts[i] !== v2Parts[i]) {
        return v1Parts[i] - v2Parts[i]
      }
    }
    return v1Parts.length - v2Parts.length
  }

  const handleCopyAll = async () => {
    console.log("[v0] Copy all clicked, userAgents length:", generatedUserAgents.length)
    if (generatedUserAgents.length === 0) {
      showModal("⚠️ কিছু নেই!", "কপি করার জন্য কোন ইউজার এজেন্ট নেই।", "warning")
      return
    }

    try {
      const content = generatedUserAgents.map((ua) => ua.userAgent).join("\n")
      await navigator.clipboard.writeText(content)
      console.log("[v0] Copy successful")
      setAllCopied(true)
      showModal("✅ কপি সফল!", `${generatedUserAgents.length}টি ইউজার এজেন্ট সফলভাবে কপি হয়েছে।`, "success")
      setTimeout(() => setAllCopied(false), 2000)
    } catch (error) {
      console.error("[v0] Copy failed:", error)
      showModal("❌ কপি ব্যর্থ!", "ইউজার এজেন্ট কপি করতে সমস্যা হয়েছে।", "error")
    }
  }

  const handleDownloadAll = async () => {
    if (generatedUserAgents.length === 0) {
      showModal("⚠️ কিছু নেই!", "ডাউনলোড করার জন্য কোন ইউজার এজেন্ট নেই।", "warning")
      return
    }

    try {
      const content = generatedUserAgents.map((ua) => ua.userAgent).join("\n")
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
      a.download = `${platform}_${appType}_user_agents_${timestamp}.txt`

      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      showModal("✅ ডাউনলোড সফল!", `${generatedUserAgents.length}টি ইউজার এজেন্ট সফলভাবে ডাউনলোড হয়েছে।`, "success")
    } catch (error) {
      console.error("Error downloading:", error)
      showModal("❌ ডাউনলোড ব্যর্থ!", "ইউজার এজেন্ট ডাউনলোড করতে সমস্যা হয়েছে।", "error")
    }
  }

  const handleCopyIndividual = async (index) => {
    try {
      await navigator.clipboard.writeText(generatedUserAgents[index].userAgent)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      console.error("Error copying individual:", error)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-4">
          <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">ইউজার এজেন্ট জেনারেটর</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">User Agent Generator</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          উচ্চ মানের এবং ইউনিক ইউজার এজেন্ট তৈরি করুন
        </p>
      </div>

      {/* User Info Card */}
      {currentUser && (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">স্বাগতম, {currentUser.user_name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  বাকি জেনারেশন: {AccessKey.getRemainingGenerations(currentUser)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generation Form */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">জেনারেশন সেটিংস</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">প্ল্যাটফর্ম</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="">প্ল্যাটফর্ম নির্বাচন করুন</option>
              <option value="iOS">iOS</option>
              <option value="Android">Android</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">অ্যাপ টাইপ</label>
            <select
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="">অ্যাপ টাইপ নির্বাচন করুন</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">পরিমাণ</label>
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !platform || !appType}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                জেনারেট হচ্ছে...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                ইউজার এজেন্ট জেনারেট করুন
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Results */}
      {generatedUserAgents.length > 0 && (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              জেনারেট করা ইউজার এজেন্ট ({generatedUserAgents.length})
            </h3>
            <div className="flex gap-2">
              <Button onClick={handleCopyAll} variant="outline" className="flex items-center gap-2 bg-transparent">
                <Copy className="w-4 h-4" />
                সব কপি করুন
              </Button>
              <Button onClick={handleDownloadAll} variant="outline" className="flex items-center gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                ডাউনলোড করুন
              </Button>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {generatedUserAgents.map((ua, index) => (
              <div
                key={ua.id}
                className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-center justify-between">
                  <code className="text-sm text-slate-700 dark:text-slate-300 flex-1 mr-4 break-all">
                    {ua.userAgent}
                  </code>
                  <Button
                    onClick={() => handleCopyIndividual(index)}
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    {copiedIndex === index ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <ProgressModal
        isOpen={progressModal.isOpen}
        title={progressModal.title}
        message={progressModal.message}
        progress={progressModal.progress}
        type={progressModal.type}
        showCancel={progressModal.showCancel}
        onCancel={() => setProgressModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{modal.title}</h3>
            <p className="text-slate-700 dark:text-slate-300 mb-6">{modal.message}</p>
            <div className="flex gap-3 justify-end">
              {modal.showCancel && (
                <Button variant="outline" onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}>
                  বাতিল
                </Button>
              )}
              <Button
                onClick={() => {
                  console.log("[v0] Modal OK button clicked - executing onConfirm")
                  modal.onConfirm()
                  if (!modal.showCancel) {
                    setModal((prev) => ({ ...prev, isOpen: false }))
                  }
                }}
              >
                ঠিক আছে
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
