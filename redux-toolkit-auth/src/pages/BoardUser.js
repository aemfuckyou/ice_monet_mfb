import React, {useState, useEffect} from "react";
import UserService from "../app/services/user.service";

const BoardUser = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (
                    error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

            }
        );
    }, []);
    return(
        <div className="container">
            <header className="container bg-light p-5">
              <h3>
                  {content}
              </h3>
            </header>
        </div>
    );
};

export default BoardUser;
