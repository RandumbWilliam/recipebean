<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/RandumbWilliam/recipebean">
    <img src="images/recipebean_logo.png" alt="Logo" width="auto" height="80">
</a>

<h3 align="center">Recipebean</h3>

  <p align="center">
    Modernized cooking app
    <br />
    <br />
    <a href="https://randumb-recipebean.netlify.app/">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

  <a href="https://randumb-recipebean.netlify.app/" target="_blank">
    <img src="images/home_screenshot.png" alt="Logo" width="800" height="auto">
</a>
<br />
<br />

Having a passion for cooking, I wanted a personalized digtial cookbook to store my recipes. There are many great apps out there, but are either over-saturated with features and stray away from a personalized cookbook, or have clunky UI that are not intuitive to the user. The goal of this project was to create a simple and intuitive UI cookbook app to store you recipes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![MUI][MUI]][MUI-url]
- [![StyledComponents][Styled-Components]][Styled-Components-url]
- [![Node][Node.js]][Node-url]
- [![Express][Express]][Express-url]
- [![GraphQL][GraphQL]][GraphQL-url]
- [![Apollo-GraphQL][Apollo-Graphql]][Apollo-GraphQL-url]
- [![MikroORM][MikroORM]][MikroORM-url]
- [![TypeGraphQL][TypeGraphQL]][TypeGraphQL-url]
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
- [![Redis][Redis]][Redis-url]
- [![Cloudinary][Cloudinary]][Cloudinary-url]
- [![Render][Render]][Render-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how setup the project locally:

### Prerequisites

- **npm**

  ```sh
  npm install npm@latest -g
  ```

- **Cloudinary** - setup a cloudinary account to get necessary information to store recipe cover images:

  ```
  CLOUDINARY_CLOUD_NAME =
  CLOUDINARY_FOLDER =
  CLOUDINARY_API_KEY =
  CLOUNDINARY_API_SECRET =
  ```

- **Redis** - setup redis to store sessions (default redis URL)

  ```
  REDIS_URL = 127.0.0.1:6379
  ```

- **PostgreSQL** - setup local PostreSQL for your database
  ```
  POSTGRES_USER =
  POSTGRES_PASSWORD =
  POSTGRES_DB_NAME =
  POSTGRES_HOST =
  POSTGRES_PORT =
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/RandumbWilliam/recipebean.git
   ```

2. Grap the necessary environment variables from Cloundinary and PostgreSQL
3. Create a `.env` and fill in the necessary environment variables provided by `.env.example` for both `client` and `server`
4. Run your redis server
   ```sh
   redis-server
   ```
5. `server` - install NPM packages
   ```sh
   npm install
   ```
6. `server` - run watch
   ```sh
   npm run watch
   ```
7. `server` - run dev
   ```sh
   npm run dev
   ```
8. `client` - install NPM packages
   ```sh
   npm install
   ```
9. `client` - run dev
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Add Ingredient Shopping List
- [ ] Add Meal Planner
- [ ] Add Additional UI tweaks

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

William Zhen - https://www.linkedin.com/in/william-zhen/ - w2zhen@uwaterloo.ca

Project Link: [https://github.com/RandumbWilliam/recipebean](https://github.com/RandumbWilliam/recipebean)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/home_screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Apollo-GraphQL]: https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql
[Apollo-GraphQL-url]: https://www.apollographql.com/
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[GraphQL]: https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql
[GraphQL-url]: https://graphql.org/
[MUI]: https://img.shields.io/badge/-MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
[Styled-Components]: https://img.shields.io/badge/-StyledComponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white
[Styled-Components-url]: https://styled-components.com/
[Node.js]: https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en
[Express]: https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com/
[MikroORM]: https://img.shields.io/badge/-MikroORM-006384?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTUwLjAwMDAwMHB0IiBoZWlnaHQ9IjE1MC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDE1MC4wMDAwMDAgMTUwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTUwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTYzMSAxNDg5IGMtMzQwIC0zNyAtNTkxIC0yMDkgLTU5MSAtNDAzIDEgLTE3MyAyMzYgLTM0MiA1MzggLTM4NgoxMTkgLTE4IDM1NCAtOCA0NjIgMTkgMTEzIDI5IDI3MyAxMDcgMzMxIDE2MyAxMzAgMTI1IDEzMyAyODcgNyA0MDkgLTE0NyAxNDUKLTQ2NSAyMjkgLTc0NyAxOTh6IG0yODQgLTE5NCBjODEgLTIxIDE2OSAtNzEgMjAxIC0xMTMgMTEzIC0xNDcgLTc2IC0zMTIKLTM1NiAtMzEyIC0xMzUgMCAtMjcyIDQyIC0zMzkgMTAzIC0zNyAzNCAtNjQgMTAzIC01NiAxNDQgMTMgNjkgMTEzIDE0NCAyMzUKMTc3IDc0IDIwIDI0MCAyMCAzMTUgMXoiLz4KPHBhdGggZD0iTTU1IDgzOSBjLTYzIC0xODkgMTI4IC0zODIgNDQ1IC00NTAgMTQ3IC0zMiAzNzMgLTMyIDUxMyAtMSAyMTkgNDgKMzg5IDE1OCA0NDIgMjg1IDE5IDQ3IDE5IDEzNyAwIDE4NCBsLTE1IDM2IC0zNiAtMzcgYy04MCAtODMgLTI0OCAtMTU4IC00MjQKLTE5MSAtMTY1IC0zMCAtNDM3IC0xNiAtNTg1IDMyIC04MSAyNSAtMjE2IDk5IC0yNzIgMTQ4IGwtNTEgNDUgLTE3IC01MXoiLz4KPHBhdGggZD0iTTYwIDQ4OCBjLTQyIC05OCAtMTYgLTE5MyA4MCAtMjg4IDEyOCAtMTI5IDM1MSAtMjAwIDYyNCAtMjAwIDM0MSAwCjYxMiAxMjQgNjkyIDMxNSAyMCA0OCAxNyAxMzIgLTYgMTgzIC0yMiA0OCAtMjkgNTEgLTU2IDIxIC0zNiAtNDAgLTE2MSAtMTA5Ci0yNTEgLTEzOSAtMjQ3IC04MSAtNTI1IC04MSAtNzY3IDAgLTEwMCAzMyAtMTkyIDgzIC0yNDEgMTMxIC0xNyAxNiAtMzYgMjkKLTQyIDI5IC02IDAgLTIxIC0yMyAtMzMgLTUyeiIvPgo8L2c+Cjwvc3ZnPgo=
[MikroORM-url]: https://mikro-orm.io/
[TypeGraphQL]: https://img.shields.io/badge/-TypeGraphQL-E10098?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMzY1LjAwMDAwMHB0IiBoZWlnaHQ9IjM2NS4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDM2NS4wMDAwMDAgMzY1LjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMzY1LjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTE3NjkgMzQxNyBjLTg3IC0yNSAtMTUyIC04OCAtMTgzIC0xNzkgbC0yMSAtNjMgLTM3MCAtMjIyIC0zNzAKLTIyMyAtNDUgMjIgYy02MyAzMSAtMTY3IDMxIC0yMzIgMCAtODkgLTQ0IC0xNTggLTE0OSAtMTU4IC0yNDIgMCAtODUgNTkKLTE4NCAxNDIgLTIzNyBsMzggLTIzIDAgLTQxOCAwIC00MTggLTM5IC0yMiBjLTE1MyAtODYgLTE4NCAtMjg1IC02NCAtNDEzIDY2Ci03MSAxMzEgLTkzIDI0NyAtODQgbDg4IDcgMzgwIC0yMjkgYzIwOSAtMTI1IDM4MiAtMjMyIDM4MyAtMjM4IDM5IC0xNDggMTUwCi0yNDUgMjgwIC0yNDUgMTA5IDAgMjIyIDgxIDI2MCAxODUgMTAgMjggMjcgNTggMzggNjggMTIgMTAgMTg2IDExNyAzODggMjM4CmwzNjcgMjIxIDgwIC03IGMxMDEgLTkgMTY3IDEwIDIyOSA2OCA1MiA0OCA2OSA3OCA4NCAxNDYgMjIgMTA0IC0yNCAyMTEgLTExOQoyNzQgbC00MiAyOCAwIDQyNCAwIDQyNCAyOCAxNSBjMzggMjAgODYgNzMgMTEzIDEyNSA0NyA5MiAyMiAyMzYgLTU0IDMwOSAtNzcKNzUgLTIwMyA5NyAtMzA0IDUzIGwtNTIgLTIzIC0zNzAgMjIzIC0zNzAgMjIyIC0xNiA1NCBjLTE5IDY1IC03NyAxMzIgLTEzOAoxNjIgLTU1IDI2IC0xNDAgMzQgLTE5OCAxOHogbTYzNyAtNjQwIGwzMzkgLTIwMyA3IC02NCBjNCAtMzYgNCAtNjggMCAtNzIgLTQKLTQgLTQyOCAtMjU0IC05NDIgLTU1NyBsLTkzNSAtNTUwIC0yNSAyMyBjLTE0IDEyIC0zNyAzMCAtNTIgMzkgbC0yOCAxNyAwCjQyNSAwIDQyNCAyOCAxNSBjNzkgNDEgMTQyIDE1MiAxNDIgMjUwIGwwIDQxIDMzOCAyMDMgYzE4NSAxMTEgMzQ1IDIwMiAzNTMKMjAyIDkgMCAyOCAtMTAgNDMgLTIxIDQwIC0zMSAxMjAgLTU5IDE3MSAtNTkgNTMgMCAxMzggMzEgMTgwIDY1IDE3IDE0IDMzIDI1CjM2IDI1IDQgMCAxNTkgLTkxIDM0NSAtMjAzeiBtMzI4IC0xNzM2IGMtNSAtNSAtMTU5IC0xMDAgLTM0MyAtMjEwIGwtMzM0Ci0yMDAgLTM1IDMxIGMtOTQgODIgLTIzOSA4NyAtMzM3IDEyIC0yNSAtMTkgLTQ4IC0zNCAtNTEgLTM0IC0zIDAgLTE1NCA4OQotMzM1IDE5OCBsLTMyOSAxOTcgNjcgNiBjMTE4IDEwIDE3MDggMTAgMTY5NyAweiIvPgo8L2c+Cjwvc3ZnPgo=
[TypeGraphQL-url]: https://typegraphql.com/
[PostgreSQL]: https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Redis]: https://img.shields.io/badge/-Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[Cloudinary]: https://img.shields.io/badge/-Cloudinary-3448C5?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNy41LjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iY2xkLW1haW4tbG9nbyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4Ig0KCSB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMjAuNyA3OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIwLjcgNzk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNmZmZmZmY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJMYXllcl8yXzAwMDAwMTE2OTQ1OTA2NzIyNTM5NzE5ODcwMDAwMDA0MzUyMzI5NTcwMDkxNjc0MDEyXyI+DQoJPGcgaWQ9IkxheWVyXzEtMiI+DQoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05Ny45LDI4LjFDOTIuNiwxMS41LDc3LjIsMC4xLDU5LjcsMEM0NS4xLTAuMSwzMS41LDcuOSwyNC42LDIwLjlDOC40LDIzLjgtMi41LDM5LjMsMC41LDU1LjYNCgkJCWMxLjcsOS42LDgsMTcuOCwxNi45LDIxLjlsMC44LDAuM2gwdi04LjVDNy43LDYyLjgsNC40LDQ5LjEsMTAuOSwzOC42YzMuNi01LjksOS44LTkuOCwxNi42LTEwLjVsMi4xLTAuMmwwLjktMS45DQoJCQlDMzUuOCwxNC43LDQ3LjIsNy41LDU5LjcsNy42YzE1LDAuMSwyOCwxMC40LDMxLjUsMjVsMC43LDIuOWgzYzEwLjEsMC4yLDE4LjEsOC40LDE4LjIsMTguNWMwLDctNC4xLDEyLjgtMTEsMTUuN3Y4LjFsMC41LTAuMg0KCQkJYzExLjEtMy43LDE4LjEtMTIuNywxOC4xLTIzLjZDMTIwLjYsNDAuOCwxMTAuOSwyOS44LDk3LjksMjguMXoiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ1LjEsNzYuOGwxLjcsMS43YzAuMSwwLjEsMC4xLDAuMywwLDAuNUM0Ni43LDc5LDQ2LjYsNzksNDYuNSw3OUgzMy40Yy0zLjMsMC02LTIuNy02LTZWNDcuNg0KCQkJYzAtMC4yLTAuMS0wLjMtMC4zLTAuM2gwaC0yLjhjLTAuMiwwLTAuMy0wLjEtMC4zLTAuM2MwLTAuMSwwLTAuMiwwLjEtMC4ybDExLjEtMTEuMWMwLjEtMC4xLDAuMy0wLjEsMC41LDBjMCwwLDAsMCwwLDANCgkJCWwxMS4xLDExLjFjMC4xLDAuMSwwLjEsMC4zLDAsMC41Yy0wLjEsMC4xLTAuMSwwLjEtMC4yLDAuMWgtMi44Yy0wLjIsMC0wLjMsMC4xLTAuMywwLjN2MjVDNDMuMyw3NC4yLDQ0LDc1LjcsNDUuMSw3Ni44eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjkuNiw3Ni44bDEuNywxLjdjMC4xLDAuMSwwLjEsMC4zLDAsMC41QzcxLjIsNzksNzEuMiw3OSw3MS4xLDc5SDU4Yy0zLjMsMC02LTIuNy02LTZWNTQNCgkJCWMwLTAuMi0wLjEtMC4zLTAuMy0wLjNoLTIuOGMtMC4yLDAtMC4zLTAuMi0wLjMtMC4zYzAtMC4xLDAtMC4yLDAuMS0wLjJMNTkuNyw0MmMwLjEtMC4xLDAuMy0wLjEsMC41LDBjMCwwLDAsMCwwLDBsMTEuMSwxMS4xDQoJCQljMC4xLDAuMSwwLjEsMC4zLDAsMC41Yy0wLjEsMC4xLTAuMSwwLjEtMC4yLDAuMWgtMi44Yy0wLjIsMC0wLjMsMC4yLTAuMywwLjN2MTguNkM2Ny45LDc0LjIsNjguNSw3NS43LDY5LjYsNzYuOHoiLz4NCgkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTk0LjIsNzYuOGwxLjcsMS43YzAuMSwwLjEsMC4xLDAuMywwLDAuNUM5NS44LDc5LDk1LjcsNzksOTUuNyw3OUg4Mi41Yy0zLjMsMC02LTIuNy02LTZWNjAuNA0KCQkJYzAtMC4yLTAuMS0wLjMtMC4zLTAuM2wwLDBoLTIuOGMtMC4yLDAtMC4zLTAuMS0wLjMtMC4zYzAtMC4xLDAtMC4yLDAuMS0wLjJsMTEuMS0xMS4xYzAuMS0wLjEsMC4zLTAuMSwwLjUsMGMwLDAsMCwwLDAsMA0KCQkJbDExLjEsMTEuMWMwLjEsMC4xLDAuMSwwLjMsMCwwLjVjLTAuMSwwLjEtMC4yLDAuMS0wLjIsMC4xaC0yLjhjLTAuMiwwLTAuMywwLjEtMC4zLDAuM3YwdjEyLjJDOTIuNSw3NC4yLDkzLjEsNzUuNyw5NC4yLDc2Ljh6Ig0KCQkJLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==
[Cloudinary-url]: https://cloudinary.com/
[Render]: https://img.shields.io/badge/-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white
[Render-url]: https://render.com/
