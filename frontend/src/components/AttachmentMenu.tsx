import { useState, useRef, useEffect } from 'react';

interface AttachmentMenuProps {
    onFileSelect?: (files: FileList) => void;
    onMediaSelect?: (files: FileList) => void;
    onContactSelect?: () => void;
    onPollCreate?: () => void;
    onEventCreate?: () => void;
}

const AttachmentMenu = ({
    onFileSelect,
    onMediaSelect,
    onContactSelect,
    onPollCreate,
    onEventCreate
}: AttachmentMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const mediaInputRef = useRef<HTMLInputElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('uploaded_file', file);

            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            console.log('File uploaded successfully:', data);
            return data;
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload file');
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            try {
                // Upload to backend
                await uploadFile(files[0]);
                onFileSelect?.(files);
                setIsOpen(false);
            } catch (error) {
                console.error('Error handling file:', error);
            }
        }
        // Reset input
        if (event.target) {
            event.target.value = '';
        }
    };

    const handleMediaChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            try {
                // Upload to backend
                await uploadFile(files[0]);
                onMediaSelect?.(files);
                setIsOpen(false);
            } catch (error) {
                console.error('Error handling media:', error);
            }
        }
        // Reset input
        if (event.target) {
            event.target.value = '';
        }
    };

    const menuItems = [
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2m0 18h12v-8H6v8z"/>
                </svg>
            ),
            label: 'File',
            color: 'text-blue-400',
            onClick: () => fileInputRef.current?.click()
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
            ),
            label: 'Photos & videos',
            color: 'text-blue-400',
            onClick: () => mediaInputRef.current?.click()
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            ),
            label: 'Contact',
            color: 'text-orange-400',
            onClick: () => {
                onContactSelect?.();
                setIsOpen(false);
            }
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
            ),
            label: 'Poll',
            color: 'text-amber-400',
            onClick: () => {
                onPollCreate?.();
                setIsOpen(false);
            }
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                </svg>
            ),
            label: 'Event',
            color: 'text-red-400',
            onClick: () => {
                onEventCreate?.();
                setIsOpen(false);
            }
        }
    ];

    return (
        <div className="relative" ref={menuRef}>
            {/* Attachment Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-slate-400 hover:text-indigo-400 transition-colors hover:bg-slate-700/50 rounded-xl"
                title="Attach"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
            </button>

            {/* Hidden File Inputs */}
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
            />
            <input
                ref={mediaInputRef}
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                multiple
            />

            {/* Popup Menu */}
            {isOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden animate-slideUp z-50">
                    <div className="py-2">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className="w-full px-4 py-3 flex items-center gap-4 hover:bg-slate-700/50 transition-colors text-left"
                            >
                                <div className={`${item.color} flex-shrink-0`}>
                                    {item.icon}
                                </div>
                                <span className="text-slate-200 font-medium text-base">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttachmentMenu;
