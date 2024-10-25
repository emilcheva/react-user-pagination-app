import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, useEffect, useState } from "react";
import ColorInput from "./ColorInput";
import UserCard from "./UserCard";
import List from "./List";
import { FALLBACK_COLOR, fetchUsers, prefix, validHex } from "../utils";
import { Action, State } from "../hooks/usePageColorReducer";
import usePersistedPageColorReducer from "../hooks/usePersistedPageColorReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faLocationDot,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";
import { User } from "../types";
import { PaginationSkeleton } from "./PaginationSkeleton";

const Users = () => {
  const queryClient = useQueryClient();
  const [state, dispatch] = usePersistedPageColorReducer() as [State, Dispatch<Action>];

  const { currentPage, colors } = state;
  const [inputColor, setInputColor] = useState(colors[currentPage] || FALLBACK_COLOR);

  const handleOnInputChange = (color: string) => {
    setInputColor(color);
    if (validHex(color)) {
      dispatch({ type: "SET_COLOR", color: prefix(color) });
    }
  };

  useEffect(() => {
    setInputColor(colors[currentPage] || FALLBACK_COLOR);
  }, [currentPage, colors]);

  const { data, error, isLoading, isSuccess, isError, isPlaceholderData } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => fetchUsers(currentPage),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["users", currentPage + 1],
        queryFn: () => fetchUsers(currentPage + 1),
      });
    }
  }, [data, isPlaceholderData, currentPage, queryClient]);

  return (
    <section className="flex flex-col items-center gap-2 md:gap-5">
      <h1 className="mb-4 text-2xl">Users (https://randomuser.me)</h1>

      {isError && <div>Error: {error.message}</div>}

      {isSuccess && <ColorInput inputColor={inputColor} onInputChange={handleOnInputChange} />}

      {!isError && (
        <Pagination>
          <Pagination.Button
            className="left-0"
            aria-label="Previous page"
            onClick={() => dispatch({ type: "SET_PAGE", currentPage: Math.max(currentPage - 1, 1) })}
            disabled={currentPage === 1 || isLoading}
          >
            <FontAwesomeIcon size="lg" fixedWidth icon={faArrowLeft} />
          </Pagination.Button>

          <Pagination.Content>
            {isLoading ? (
              <PaginationSkeleton />
            ) : (
              data?.results?.map((user: User) => {
                const { login, name, picture, email, phone, location } = user;
                return (
                  <UserCard key={login.uuid}>
                    <UserCard.Image imgSrc={picture.large} />
                    <UserCard.ProfileInfo>
                      <h2 className="mb-4 text-xl">
                        {name.first} {name.last}
                      </h2>
                      <List
                        className="gap-2 text-gray-500"
                        itemsBgColor={validHex(inputColor) ? prefix(inputColor) : FALLBACK_COLOR}
                      >
                        <List.Item>
                          <FontAwesomeIcon className="mr-1 text-icon" fixedWidth icon={faEnvelope} /> {email}
                        </List.Item>
                        <List.Item>
                          <FontAwesomeIcon className="mr-1 text-icon" fixedWidth icon={faMobileScreen} /> {phone}
                        </List.Item>
                        <List.Item>
                          <FontAwesomeIcon className="mr-1 text-icon" fixedWidth icon={faLocationDot} />
                          {location.city}, {location.state}, {location.country}
                        </List.Item>
                        <List.Item>
                          {location.street.number} {location.street.name}
                        </List.Item>
                      </List>
                    </UserCard.ProfileInfo>
                  </UserCard>
                );
              })
            )}
          </Pagination.Content>

          <Pagination.Button
            className="right-0"
            aria-label="Next page"
            onClick={() => {
              dispatch({ type: "SET_PAGE", currentPage: data?.hasMore ? currentPage + 1 : currentPage });
            }}
            disabled={isPlaceholderData || !data?.hasMore || isLoading}
          >
            <FontAwesomeIcon size="lg" fixedWidth icon={faArrowRight} />
          </Pagination.Button>
        </Pagination>
      )}

      {isSuccess && <div>Current Page: {currentPage}</div>}
    </section>
  );
};

export default Users;
