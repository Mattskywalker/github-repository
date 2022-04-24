import { GridSelectionModel } from "@mui/x-data-grid";
import { createContext, ReactNode, useEffect, useState } from "react";
import { IRepository } from "../interfaces/IRepositories";

interface IFavContext {
    children: ReactNode
}

interface IFavValues {
    handleFavorite: (repo: IRepository) => void
    isFavorite: (id: number) => boolean
    removeFavorite: (repo: IRepository) => void
    removeSelection: (selectionModel: GridSelectionModel) => void
    favorites: IRepository[]
}

export const FavContext = createContext<IFavValues>({} as IFavValues)

const FavProvider: React.FC<IFavContext> = ({ children }) => {

    const [favorites, setFavorites] = useState<Array<IRepository>>([]);

    useEffect(() => {
        fetchFavorites();

    }, [])// component did mount

    function fetchFavorites() {
        const localstorageItem = localStorage.getItem("listFavoriteRepo");
        const repoList: IRepository[] = localstorageItem ? JSON.parse(localstorageItem) : [];

        setFavorites(repoList);
    }

    function isFavorite(id: number) {
        return !!favorites.filter(repository => repository.id === id).length
    }

    function handleFavorite(repo: IRepository) {

        if (!isFavorite(repo.id)) {
            addFavorite(repo)
        } else {
            removeFavorite(repo);
        }
    }

    function addFavorite(repo: IRepository) {

        localStorage.setItem("listFavoriteRepo", JSON.stringify([...favorites, repo]));
        setFavorites([...favorites, repo]);
    }

    function removeFavorite(repo: IRepository) {

        const cleaned = favorites.filter(repository => repository.id !== repo.id)
        localStorage.setItem("listFavoriteRepo", JSON.stringify([...cleaned]));
        setFavorites([...cleaned]);
    }

    function removeSelection(selectionModel: GridSelectionModel) {
        let cleanedList = [...favorites];

        selectionModel.forEach((id) => {
            cleanedList = cleanedList.filter((repo) => repo.id !== id)
        })

        localStorage.setItem("listFavoriteRepo", JSON.stringify([...cleanedList]));
        setFavorites([...cleanedList]);

    }

    return (
        <FavContext.Provider value={{ handleFavorite, isFavorite, removeFavorite, removeSelection, favorites }} >
            {children}
        </FavContext.Provider>
    )
}

export default FavProvider;