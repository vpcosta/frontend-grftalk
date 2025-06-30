import { handleSignOut } from "@/lib/server/auth";
import { useAuthStore } from "@/stores/authStore";
import { useChatStore } from "@/stores/chatStore";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Home, LogOut, Menu, Moon, Sun, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Header = () => {
  const { setTheme } = useTheme();
  const { user, clearUser } = useAuthStore();
  const { setChat, showChatsList, setShowChatsList } = useChatStore();

  const pathname = usePathname();

  const handleLogout = () => {
    handleSignOut();
    setChat(null);
    clearUser();
    toast.success("Deslogado com sucesso!", { position: "top-center" });
  };

  return (
    <header className="h-header px-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-50 dark:border-slate-800">
      <nav className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="hidden min-[480px]:block">
          <Link href="/">
            <Image src={Logo} alt="Logo GRF Talk" width={170} priority />
          </Link>
        </div>

        <Button
          className="flex min-[480px]:hidden"
          variant="outline"
          size="icon"
          asChild
        >
          <Link href="/">
            <Home className="size-[1.2rem]" />
          </Link>
        </Button>

        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 absolute" />
                <span className="sr-only">Alterar Tema</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <div className='flex gap-6'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-5">
                    <Avatar className="size-7">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <ChevronDown
                      className="size-5 text-slate-500 dark:text-slate-300"
                      strokeWidth={2.5}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href="/account">
                    <DropdownMenuItem>
                      <User className="mr-3 size-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 size-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                className="flex lg:hidden"
                size="icon"
                onClick={() => setShowChatsList(!showChatsList)}
              >
                <Menu className="size[1.2rem]" />
                <span className="sr-only">Abrir/Fechar Conversas</span>
              </Button>
            </div>
          )}

          {!user && pathname.startsWith("/auth") && (
            <div>
              {pathname !== "/auth/signin" ? (
                <Button size="sm" asChild>
                  <Link href="/auth/signin">Entrar</Link>
                </Button>
              ) : (
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Cadastro</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
