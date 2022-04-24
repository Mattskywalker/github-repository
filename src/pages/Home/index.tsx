import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Pagination, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { FavContext } from "../../contexts/FavContext";
import { IRepository } from "../../interfaces/IRepositories";
import api from "../../services/api";

import './Home.css'

const MAX_ITEM_PAGE = 5;
const PAGE_INDEX = 'pageIndex';

const Home = () => {

    const { handleFavorite, isFavorite } = useContext(FavContext)
    const [repositories, setRepositories] = useState<Array<IRepository>>([]);
    const [page, setPage] = useState<number>(Number(sessionStorage.getItem(PAGE_INDEX)) || 1)

    useEffect(() => {
        fetchRespositories();
        setPage(Number(sessionStorage.getItem(PAGE_INDEX)) || 1)
    }, [])// component did mount




    function fetchRespositories() {
        api.get<Array<IRepository>>('/repositories').then((response) => {
            setRepositories([{
                html_url: 'https://github.com/Mattskywalker/github-repository',
                description: "app that shows GitHub repositories",
                full_name: "Mattskywalker/github-repository",
                id: 101,
                name: 'github-repository'
            }, ...response.data]);
        }).catch((error) => {
            console.error(error);
        })
    }

    function findRepo(id: Number) {
        return repositories.filter((repo) =>
            repo.id === id
        ).shift() || {} as IRepository
    }

    function listItems(items: IRepository[], pageActual: number, limitItens: number) {
        const result = [];
        const totalPage = Math.ceil(items.length / limitItens);
        let count = (pageActual * limitItens) - limitItens;
        const delimiter = count + limitItens;

        if (pageActual <= totalPage) {
            for (let i = count; i < delimiter; i++) {
                result.push(items[i]);
                count++;
            }
        }

        return result
    }

    function handlePage(event: React.ChangeEvent<unknown>, value: number) {
        setPage(value);
        sessionStorage.setItem(PAGE_INDEX, value.toString())
    }

    return (
        <div className="Home" >
            <title>Home</title>
            <div className="title" ><Typography variant="h4" >Repositórios</Typography></div>

            <div className="card-container" >
                {listItems(repositories, page, MAX_ITEM_PAGE)?.map((repo) =>
                    repo && (
                        <div className="repo-card" key={repo?.id} >
                            <div className="img-container" ><img style={{ width: '210px' }} alt="repo-img" src={`https://avatars.dicebear.com/api/jdenticon/${repo?.name}.svg`} /></div>
                            <div className="text-container" >
                                <div>
                                    <Typography variant="h4" >{repo?.full_name}</Typography>

                                    <div className="description-area" >
                                        <Typography style={{ fontSize: '18px', justifyContent: 'left' }} >{repo?.description}</Typography>
                                    </div>

                                </div>

                                <div className="footer" ><Typography style={{ fontSize: '18px', justifyContent: 'left' }} >Link: <a href={repo?.html_url} >{repo?.html_url}</a></Typography><IconButton onClick={() => { handleFavorite(findRepo(repo?.id)) }} >{isFavorite(repo?.id) ? <Favorite style={{ color: '#FF0000' }} /> : <FavoriteBorder />}</IconButton></div>
                            </div>
                        </div>
                    )
                )}
            </div>

            <footer><Pagination page={page} onChange={handlePage} count={Math.ceil(repositories.length / MAX_ITEM_PAGE)} /></footer>

        </div >
    )
}

export default Home;
