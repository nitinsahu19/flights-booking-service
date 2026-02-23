const express = require("express");
const apiRoutes = require("./routes");
const { ServerConfig } = require("./config");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is running at port :  ${ServerConfig.PORT}

* *       *    * * * * * *    * * * * * *   * * * * * *    * *       *
*  *      *         *              *             *         *  *      *
*   *     *         *              *             *         *   *     * 
*    *    *         *              *             *         *    *    *
*     *   *         *              *             *         *     *   *
*      *  *    * * * * * *         *        * * * * * *    *       * *
 `);
});
