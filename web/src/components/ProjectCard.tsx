import { Link } from "react-router-dom";
import { VStack, HStack, Text, Box, Badge, Divider, Tag, Heading } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Project } from "../context/StateContext";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  /// @todo work on multiple circuits.
  /// @todo uncomplete info for mocked fallback circuit data.
  const circuit = project.circuits ? project.circuits[0] : {
    data: {
      fixedTimeWindow: 10,
      template: {
        source: "todo",
        paramsConfiguration: [2,3,4]
      },
      compiler: {
        version: "0.5.1",
        commitHash: "0xabc"
      },
      avgTimings: {
        fullContribution: 100
      },
      zKeySizeInBytes: 10,
      waitingQueue: {
        completedContributions: 0
      }
    }
  }
/**
 * Necessary data to define a ceremony database document.
 * @dev The data is both entered by the coordinator and derived.
 * @property {string} title - the title/name of the ceremony.
 * @property {string} description - a brief description of the ceremony.
 * @property {number} startDate - the start (opening to contributions) date for the ceremony (in ms).
 * @property {number} endDate - the end (closing to contributions) date for the ceremony (in ms).
 * @property {CeremonyTimeoutType} timeoutMechanismType - the timeout mechanism type used for avoiding blocking contribution behaviours.
 * @property {number} penalty - the amount of time expressed in minutes that the blocking contributor has to wait before joining the waiting queue again.
 * @property {string} prefix - the prefix of the ceremony derived from the name.
 * @property {CeremonyState} state - the current state of the ceremony.
 * @property {CeremonyType} type - the type of the ceremony.
 * @property {string} coordinatorId - the unique identifier of the coordinator.
 * @property {number} lastUpdated - the timestamp where the last update of the Firestore document has happened.
 */
  return (
    <Link to={`/projects/${project.ceremony.data.title}`}>
      <VStack align="start" spacing={4} p={5} shadow="md" borderWidth="1px" fontSize={12}>
        {/* Render project information */}
        <Heading fontSize={14} fontWeight="bold">
          {project.ceremony.data.title}
        </Heading>
        <Text  >{project.ceremony.data.description}</Text>
        <Divider />
        <HStack spacing={4}>
          <Badge colorScheme={project.ceremony.data.timeoutMechanismType ? "green" : "gray"}>
            {project.ceremony.data.timeoutMechanismType ? "Fixed" : "Flexible"}
          </Badge>
          <Badge colorScheme="blue">Penalty: {project.ceremony.data.penalty}</Badge>
          <Badge colorScheme="blue">Timeout: {circuit.data.fixedTimeWindow} seconds</Badge>
        </HStack>
        <Divider />
        <HStack>
          <Box as={FaGithub} w={6} h={6} />
          <Text>{circuit.data.template.source}</Text>
        </HStack>
        <HStack>
          <Text>Start: {project.ceremony.data.startDate}</Text>
          <Text>End: {project.ceremony.data.endDate}</Text>
        </HStack>
        <HStack>
          <Text>Circom Version: {circuit.data.compiler.version}</Text>
          <Text>Commit Hash: {circuit.data.compiler.commitHash}</Text>
        </HStack>
        <Divider />
        <Text fontSize="sm" fontWeight="bold">
          Params:
        </Text>
        <HStack align="start" spacing={1}>
          {circuit.data.template.paramsConfiguration.map((param: any, index: any) => (
            <Tag key={index} size="sm" variant="solid" colorScheme="blue">
              {param}
            </Tag>
          ))}
        </HStack>
    </VStack>
    </Link >
  );
}
