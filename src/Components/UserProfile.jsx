"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User, Settings, LogOut, Bell, HelpCircle } from "lucide-react";
import { signOutUser, auth, firestore } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export function UserProfile() {
  const [userData, setUserData] = useState({
    name: "Guest",
    email: "",
    avatar: "",
    initials: "G",
  });

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user", user);
        try {
          const name = user.displayName ?? "";
          const email = user.email ?? "";
          const avatar = user.photoURL ?? "";

          // --- Compute initials ---
          let initials = "??";
          if (avatar) {
            initials = ""; // not needed, since avatar will be shown
          } else if (name) {
            initials = name.substring(0, 2).toUpperCase();
          } else if (email) {
            initials = email.substring(0, 2).toUpperCase();
          }

          setUserData({
            name: name || "Anonymous",
            email,
            avatar,
            initials,
          });
        } catch (error) {
          toast.error("Error fetching user data");
          console.error(error);
        }
      } else {
        router.push("/auth/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    try {
      await signOutUser();
      router.push("/auth/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            {userData.avatar ? (
              <AvatarImage src={userData.avatar} alt={userData.name} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userData.initials}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
