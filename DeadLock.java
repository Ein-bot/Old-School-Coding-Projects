import java.io.*;
import java.util.*;


public class DeadLock
{
    public static void main(String[] args)
    {
        Scanner input = new Scanner(System.in);
        ArrayList<String> line;
        ArrayList<String> listResource;
        ArrayList<String> deadProcess;
        ArrayList<String> deadResource;
        ArrayList<String> deadResourceNoDup;
        try 
        {
            line = new ArrayList<String>();
            listResource = new ArrayList<String>();
            deadProcess = new ArrayList<String>();
            deadResource = new ArrayList<String>();
            deadResourceNoDup = new ArrayList<String>();

            String file = "output1.txt";
            PrintWriter outputStream = new PrintWriter(file);
            while(input.hasNextLine())
            {
                line.add(input.next());
                line.add(input.next());
                line.add(input.next());
                RAG.action(line, listResource, deadResource, deadProcess, outputStream);
                line.clear();
            }
            Node.detector(deadProcess, deadResource, deadResourceNoDup, outputStream);
            outputStream.close();
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }
        
    }
}

class RAG
{
    static void action(ArrayList<String> line, ArrayList<String> listResource, ArrayList<String> deadResource, ArrayList<String> deadProcess, PrintWriter outputStream)
    {
        if (line.get(1).equals("W") || line.get(1).equals("w"))
        {
            outputStream.printf("Process %s wants resource %s. - ", line.get(0), line.get(2));
            if (listResource.contains(line.get(2)))
            {
                outputStream.printf("Process %s must wait.\n", line.get(0));
                deadResource.add(line.get(2));
                deadProcess.add(line.get(0));
            }

            else
            {
                outputStream.printf("Resource %s is allocated to process %s.\n", line.get(0), line.get(2));
                listResource.add(line.get(2));
            }
        }

        if(line.get(1).equals("R") || line.get(1).equals("r"))
        {
            outputStream.printf("Process %s releases resource %s - ",line.get(0), line.get(2));
            Node.removeNode(line, listResource);

            if (deadResource.contains(line.get(2)))
            {
                for (int i = 0; i < deadResource.size(); i++)
                {
                    if (deadResource.get(i).equals(line.get(2)))
                    {
                        outputStream.printf("Resource %s is allocated to process %s.\n", deadResource.get(i), deadProcess.get(i));
                        deadResource.remove(i);
                        deadProcess.remove(i);
                    }
                }
            }

            else
            {
                outputStream.printf("Resource %s is now free.\n", line.get(2));
            }
        }
    }
}

class Node
{
    static void detector(ArrayList<String> deadProcess, ArrayList<String> deadResource, ArrayList<String> deadResourceNoDup, PrintWriter outputStream)
    {
        if (deadProcess.isEmpty())
        {
            outputStream.printf("EXECUTION COMPLETED: No deadlock encountered.");
        }

        else
        {
            for (int k = 0; k < deadResource.size(); k++)
            {
                if (!deadResourceNoDup.contains(deadResource.get(k)))
                {
                    deadResourceNoDup.add(deadResource.get(k));
                }
            }
            Collections.sort(deadProcess);
            Collections.sort(deadResourceNoDup);
            outputStream.printf("DEADLOCK DETECTED: Process ");
            for (int i = 0; i < deadProcess.size(); i++)
            {
                outputStream.printf("%s, ", deadProcess.get(i));
            }
            outputStream.printf("and Resources ");
            for (int j = 0; j < deadResourceNoDup.size(); j++)
            {
                outputStream.printf("%s, ", deadResourceNoDup.get(j));
            }
            outputStream.printf("are found in a cycle.");
        }
    }

    static void removeNode(ArrayList<String> line, ArrayList<String> listResource)
    {
        if (listResource.contains(line.get(2)))
        {
            for (int i = 0; i < listResource.size(); i++)
            {
                if(line.get(2).equals(listResource.get(i)))
                {
                    listResource.remove(i);
                }
            }
        }
    }
}