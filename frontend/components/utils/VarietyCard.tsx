import {
  Accordion,
  AccordionSummary,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import React from "react";

interface ComponentProps {
  imgSrc: string;
  mainText: string;
  secondText: string;
  thirdText: string;
  link: string;
}

const VarietyCard = ({
  imgSrc,
  mainText,
  secondText,
  thirdText,
  link,
}: ComponentProps) => {
  return (
    <Link href={link}>
      <Card
        elevation={2}
        sx={{
          width: "100%",
          minWidth: "300px",
          height: "100px",
          maxWidth: "300px",
          border: "2px solid",
          borderColor: grey[900],
          transition: "transform 200ms ease, border-color 200ms ease",
          willChange: "transform",
          ":hover": {
            transform: "scale(105%)",
            cursor: "pointer",
            borderColor: "primary.main",
          },
        }}
      >
        <CardActionArea
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            py: "2px",
            px: 1,
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <CardMedia
            component={"img"}
            image={imgSrc}
            loading="lazy"
            sx={{
              height: "90%",
              minHeight: "90%",
              borderRadius: 1,
              width: "30%",
              minWidth: "30%",
              aspectRatio: "1/1",
            }}
          />
          <CardContent sx={{ width: "70%", height: "90%", px: 1.5, py: 0.5 }}>
            <Box
              sx={{
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  letterSpacing: "1px",
                  fontSize: 16,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {mainText || "\u00A0"}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  color: "#d0d0d0",
                  fontSize: 15,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {secondText || "\u00A0"}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#d0d0d0",
                  fontSize: 15,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {thirdText || "\u00A0"}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default React.memo(VarietyCard);
