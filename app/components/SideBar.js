"use client";

import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import SideMenuItem from './SideMenuItem';
import SignInModal from './SignInModal';
import NotificationDropdown from './NotificationDropdown';
import { useTweets } from '../context/TweetContext';
import { BiHomeCircle, BiHome } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';
import { RiInboxLine, RiFileListLine } from 'react-icons/ri';
import { IoNotificationsOutline, IoPlanet } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { IoIosMore } from 'react-icons/io';
import { FaXTwitter, FaRegBookmark } from 'react-icons/fa6';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { notifications } = useTweets();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
  <div className="flex flex-col justify-between h-screen sticky top-0 w-10 hover:w-56 group 2xl:w-auto 2xl:ml-16 p-1 overflow-hidden transition-all duration-200">
        
        {/* Logo */}
        <div 
          onClick={() => router.push('/')}
          className="hoverEffect p-1 flex items-center justify-center group-hover:justify-start w-8 group-hover:w-full 2xl:justify-start 2xl:w-auto cursor-pointer transition-all duration-200"
        >
          <FaXTwitter className="text-xl" />
        </div>

  {/* Menu */}
  <div className="mt-2 space-y-1 flex-1 flex flex-col items-center group-hover:items-start 2xl:items-start">
          <div onClick={() => router.push('/')}>
            <SideMenuItem text="Home" Icon={BiHome} active={pathname === '/'} />
          </div>
          <div onClick={() => router.push('/explore')}>
            <SideMenuItem text="Explore" Icon={FaSearch} active={pathname === '/explore'} />
          </div>
          {session && (
            <>
              <div onClick={() => router.push('/notifications')}>
                <SideMenuItem 
                  text="Notifications" 
                  Icon={IoNotificationsOutline} 
                  badge={unreadCount}
                  active={pathname === '/notifications'}
                />
              </div>
              <div onClick={() => router.push('/messages')}>
                <SideMenuItem text="Messages" Icon={RiInboxLine} active={pathname === '/messages'} />
              </div>
              <div onClick={() => router.push('/bookmarks')}>
                <SideMenuItem text="Bookmarks" Icon={FaRegBookmark} active={pathname === '/bookmarks'} />
              </div>
              <div onClick={() => router.push('/lists')}>
                <SideMenuItem text="Lists" Icon={RiFileListLine} active={pathname === '/lists'} />
              </div>
              <div onClick={() => router.push('/profile')}>
                <SideMenuItem text="Profile" Icon={CgProfile} active={pathname === '/profile'} />
              </div>
            </>
          )}
          <SideMenuItem text="Grok" Icon={IoPlanet} />
          <SideMenuItem text="More" Icon={IoIosMore} />
        </div>

        {/* Tweet Button */}
        {session && (
          <button className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold py-2 px-2 rounded-full mt-4 w-8 group-hover:w-full 2xl:w-auto shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <span className="hidden group-hover:inline 2xl:inline">Tweet</span>
            <span className="group-hover:hidden 2xl:hidden text-2xl">+</span>
          </button>
        )}

        {/* User profile or Sign In */}
        <div className="mt-auto mb-4">
          {session ? (
            <div className="relative">
              <div 
                  className="hoverEffect p-1 mt-4 flex items-center space-x-2 cursor-pointer rounded-full w-8 group-hover:w-full transition-all duration-200"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                <Image
                    src={session.user.image || '/default-avatar.png'}
                    width={32}
                    height={32}
                  alt="User Image"
                  className="rounded-full"
                />
                  <div className="hidden group-hover:flex group-hover:flex-1 group-hover:items-center group-hover:justify-between 2xl:flex 2xl:flex-1 2xl:items-center 2xl:justify-between">
                  <div>
                    <p className="font-bold text-sm truncate max-w-[120px]">{session.user.name}</p>
                    <p className="text-gray-500 text-sm truncate max-w-[120px]">@{session.user.username}</p>
                  </div>
                  <HiOutlineDotsHorizontal className="text-gray-700" />
                </div>
              </div>
              
              {showUserMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-white modern-shadow-lg rounded-2xl p-2 w-64 animate-in slide-in-from-bottom-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-bold text-sm">{session.user.name}</p>
                    <p className="text-gray-500 text-sm">@{session.user.username}</p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg font-bold text-sm transition-colors"
                  >
                    Log out @{session.user.username}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowSignIn(true)}
              className="bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold py-3 px-6 rounded-full mt-4 w-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
}