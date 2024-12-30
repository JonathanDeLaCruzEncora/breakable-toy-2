import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "./../Auth/AuthContext";

const UserMenu = () => {
  const {
    user,
    fetchUserProfile,
    accessToken,
    isLoading,
    setAccessToken,
    setUser,
  } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setUser(null);
    handleMenuClose();
    setAccessToken(null);
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoading && !(await fetchUserProfile())) {
        localStorage.removeItem("access_token");
        setAccessToken(null);
        setUser(null);
        router.push("/login");
      }
    };
    fetchUser();
  }, [accessToken, isLoading]);

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        aria-controls={open ? "logout-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "end" },
          flexDirection: { xs: "column-reverse", sm: "row" },
          alignItems: "center",
          gap: 2,
          textTransform: "initial",
        }}
      >
        <Typography sx={{ color: "grey.400" }}>{user?.name}</Typography>
        <Avatar src={user?.image || ""}></Avatar>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "logout-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
