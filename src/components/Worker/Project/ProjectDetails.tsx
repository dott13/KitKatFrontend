import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/configureStore";
import { getProjectById } from "../../../redux/projectSlice/projectSlice";
import { Spin } from "antd";
import user_img from "../../../assets/svgs/default-user.svg";

const ProjectDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const { project, status, error } = useSelector(
    (state: RootState) => state.project
  );

  useEffect(() => {
    if (user?.project?.projectId) {
      dispatch(getProjectById(user.project.projectId));
    }
  }, [dispatch, user?.project?.projectId]);

  useEffect(() => {
    console.log(project);
  });

  return (
    <div className="bg-white text-black rounded flex flex-col items-center justify-center w-[80%] h-full mx-[5%] mt-[5%] p-[2%] pb-0 gap-8">
      {status === "loading" && (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      )}

      {status === "failed" && <p className="text-red-500">{error}</p>}

      {status === "succeeded" && project ? (
        <>
          <p className="text-center w-full font-bold text-lg">
            {project.projectName}
          </p>
          <p className="text-right w-full text-sm">
            Start Date: {new Date(project.startDate).toLocaleDateString()}
          </p>
          <p className="mt-4 text-center w-full">{project.description}</p>

          {/* Manager Section */}
          <p className="text-center font-semibold text-m">Manager</p>
          <div className="flex flex-row items-center gap-2">
            <img
              className="w-10 h-10"
              src={project.manager.avatar || user_img}
              alt="manager_img"
            />
            <p>
              {project.manager.firstName} {project.manager.lastName}
            </p>
          </div>

          {/* Workers Section */}
          <p className="text-center font-semibold text-m">Workers</p>
          <div className="flex flex-row flex-wrap items-center gap-2">
            {project.workers.length > 0 ? (
              project.workers.map(
                (worker: {
                  userId: React.Key | null | undefined;
                  avatar: any;
                  firstName:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  lastName:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                }) => (
                  <div
                    key={worker.userId}
                    className="flex flex-col items-center"
                  >
                    <img
                      className="w-10 h-10"
                      src={worker.avatar || user_img}
                      alt="worker_img"
                    />
                    <p className="text-sm">
                      {worker.firstName} {worker.lastName}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500">No workers assigned.</p>
            )}
          </div>
        </>
      ) : (
        status === "succeeded" && <p>No project assigned.</p>
      )}
    </div>
  );
};

export default ProjectDetails;
