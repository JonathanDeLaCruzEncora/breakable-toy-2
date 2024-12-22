import SearchBar from "@/components/SearchBar";
import TopSongsTable from "@/components/Tables/TopSongsTable";
import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

interface PageParams {
  params: Promise<{ artistId: string }>;
}

export default async function AlbumPage({ params }: PageParams) {
  const artistId = (await params).artistId;
  return (
    <>
      <Box
        sx={{
          maxWidth: { xs: "full", sm: "848px", md: "1264px" },
          mt: "50px",
          mx: "auto",
          px: "20px",
          width: "full",
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
          }}
        >
          <Paper
            elevation={12}
            sx={{
              width: 200,
              height: 200,
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <img
              className=" object-cover  w-full h-full"
              src="https://www.mondosonoro.com/wp-content/uploads/2023/12/billie-eillish.jpg"
            />
          </Paper>
          <Box>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  mt: "20px",
                  mb: "4px",
                }}
              >
                Billie Eilish
              </Typography>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  width: "100%",
                  height: "2px",
                  borderRadius: 0,
                }}
              ></Box>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ letterSpacing: "1px", my: "20px" }}
            >
              105,222,860 Monthly Listeners
            </Typography>
          </Box>
        </Box>
        My Post: {artistId}
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", letterSpacing: "1px", my: "20px" }}
        >
          Search Results
        </Typography>
        <TopSongsTable />
      </Box>
    </>
  );
}
