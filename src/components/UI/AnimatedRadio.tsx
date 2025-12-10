import { useState, useEffect } from "react"

interface RadioOption {
    id: string
    value: string
    label: string
}

interface AnimatedRadioProps {
    options: RadioOption[]
    value: string
    onChange: (value: string) => void
    label?: string
}

export default function AnimatedRadio({ options, value, onChange, label }: AnimatedRadioProps) {
    const [selectedValue, setSelectedValue] = useState(value)

    useEffect(() => {
        setSelectedValue(value)
    }, [value])

    const handleChange = (newValue: string) => {
        // Мгновенно обновляем локальное состояние для UI
        setSelectedValue(newValue)
        // Синхронно уведомляем родителя
        onChange(newValue)
    }

    const getGliderTransform = () => {
        const index = options.findIndex((option) => option.value === selectedValue)
        return `translateY(${index * 100}%)`
    }

    const getGliderHeight = () => {
        return `${100 / options.length}%`
    }

    return (
        <div className="space-y-2.5">
            {label && (
                <label className="block text-sm font-medium text-bee-black tracking-tight">
                    {label}
                </label>
            )}
            <div className="flex items-start justify-start">
                <div className="relative flex flex-col pl-3 overflow-visible">
                    {options.map((option) => (
                        <div key={option.id} className="relative z-20 py-1">
                            <input
                                id={option.id}
                                name="role-radio"
                                type="radio"
                                value={option.value}
                                checked={selectedValue === option.value}
                                onChange={(e) => handleChange(e.target.value)}
                                className="absolute w-full h-full m-0 opacity-0 cursor-pointer z-30 appearance-none"
                            />
                            <label
                                htmlFor={option.id}
                                className={`cursor-pointer text-base py-2 px-1 block transition-colors duration-150 ease-in-out ${
                                    selectedValue === option.value
                                        ? 'text-bee-orange font-medium'
                                        : 'text-honey-600'
                                }`}
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}

                    {/* Background line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-honey-300 to-transparent z-10" />

                    {/* Animated glider with glow */}
                    <div
                        className="absolute left-0 top-0 w-px transition-transform duration-500 ease-[cubic-bezier(0.37,1.95,0.66,0.56)] z-10"
                        style={{ transform: getGliderTransform(), height: getGliderHeight() }}
                    >
                        {/* Active line segment */}
                        <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-bee-orange to-transparent" />

                        {/* Glow effect - positioned outside the line */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-16 w-16 -translate-x-1/2 bg-bee-orange opacity-40 blur-xl" />

                        {/* Horizontal gradient fade */}
                        <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-bee-orange/20 via-bee-yellow/10 to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    )
}
