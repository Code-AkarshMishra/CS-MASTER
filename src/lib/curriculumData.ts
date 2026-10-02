export interface TopicContent {
  title: string;
  subtopics: string[];
  conceptExplanation: string;
  keyPoints: string[];
  realLifeExample: string;
  technicalExample: string;
  diagramAscii?: string;
  formulas?: string[];
  advantages?: string[];
  limitations?: string[];
  applications?: string[];
  solvedProblem?: {
    problemStatement: string;
    stepByStepSolution: string[];
    finalAnswer: string;
  };
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
    explanation: string;
  };
  importantQuestions: {
    question: string;
    marks: number;
    answerSummary: string;
  }[];
  vivaQuestions: {
    question: string;
    answer: string;
  }[];
  quickRevisionPoints: string[];
  associatedVisualizer?: string; // e.g. "dsa", "sorting", "complexity", "recursion", "graph", "os", "dbms", "network", "aiml", "logic", "architecture"
}

export interface UnitData {
  unitNumber: number;
  title: string;
  hours: number;
  description: string;
  topics: {
    [topicName: string]: TopicContent;
  };
}

export interface SubjectData {
  code: string;
  title: string;
  semester: number;
  year: number;
  credits: number;
  scheme: { L: number; T: number; P: number; CIE: number; ESE: number; Total: number };
  isElective: boolean;
  isLab: boolean;
  department: string;
  specialization?: string;
  electiveCategory?: string;
  description: string;
  iconName: string;
  defaultVisualizer?: string;
  textbooks: string[];
  referenceBooks: string[];
  units: UnitData[];
}

export const COMPLETE_SYLLABUS_DATA: { [subjectCode: string]: SubjectData } = {
  // ==========================================
  // YEAR 2 - SEMESTER 3: DATA STRUCTURES & ALGORITHMS (BCS3014 / UCS3011)
  // ==========================================
  UCS3011: {
    code: "UCS3011",
    title: "Data Structures and Algorithms",
    semester: 3,
    year: 2,
    credits: 4.0,
    scheme: { L: 3, T: 1, P: 0, CIE: 40, ESE: 60, Total: 100 },
    isElective: false,
    isLab: false,
    department: "CSE",
    iconName: "Network",
    defaultVisualizer: "dsa",
    description: "Foundational course on linear and non-linear data structures, algorithmic complexity, sorting, searching, trees, and graph algorithms.",
    textbooks: [
      "Lipschutz, 'Data Structures', Schaum's Outline Series, TMH.",
      "A.K. Sharma, 'Data Structure using C', Pearson Education.",
      "Aaron M. Tenenbaum, 'Data Structures Using C and C++', PHI."
    ],
    referenceBooks: [
      "S.K. Srivastava, 'Data Structures Through C in Depth', BPB Publications.",
      "Horowitz & Sahni, 'Fundamentals of Data Structures in C++'."
    ],
    units: [
      {
        unitNumber: 1,
        title: "Introduction, Arrays, Sorting & Searching, Hashing",
        hours: 8,
        description: "Elementary data organization, asymptotic complexity, 1D/2D arrays, sparse matrices, sorting algorithms, linear/binary search, hashing and collision resolution.",
        topics: {
          "Introduction to Data Structures & Complexity": {
            title: "Introduction to Data Structures & Complexity Analysis",
            subtopics: [
              "Data Types vs Data Structures",
              "Primitive vs Non-Primitive Structures",
              "Operations on Data Structures",
              "Asymptotic Notations (Big-O, Omega, Theta)",
              "Space & Time Complexity Trade-offs"
            ],
            conceptExplanation: `A **Data Structure** is a specialized format for organizing, processing, retrieving, and storing data in computer memory to enable efficient access and modification. 
Data structures are classified into:
1. **Linear Data Structures**: Elements are arranged sequentially (Arrays, Linked Lists, Stacks, Queues).
2. **Non-Linear Data Structures**: Elements have hierarchical or interconnected relationships (Trees, Graphs, Heaps).

### Asymptotic Notations
- **Big-O ($O$)**: Upper bound / Worst-case execution time guarantee.
- **Big-Omega ($\Omega$)**: Lower bound / Best-case performance.
- **Big-Theta ($\Theta$)**: Tight bound where upper and lower bounds coincide.`,
            keyPoints: [
              "Time complexity measures the growth rate of runtime as input size $N \\to \\infty$.",
              "Space complexity evaluates auxiliary memory plus input memory required during execution.",
              "Primitive types (int, float, char) store raw values; abstract data types (ADT) encapsulate data and operational interfaces."
            ],
            realLifeExample: "Arranging books alphabetically on a library shelf represents a sorted array structure allowing $O(\\log n)$ binary search, compared to an unorganized pile requiring $O(n)$ scanning.",
            technicalExample: "In web browsers, the 'Back' and 'Forward' history buttons are implemented using two auxiliary Stack data structures providing $O(1)$ push and pop operations.",
            diagramAscii: `+---------------------------------------------+
|             DATA STRUCTURES                 |
+----------------------+----------------------+
| Linear Structures    | Non-Linear           |
| - Arrays (Contiguous)| - Binary Trees       |
| - Linked Lists       | - AVL / BST Trees    |
| - Stacks (LIFO)      | - B/B+ Trees         |
| - Queues (FIFO)      | - Graphs (V, E)      |
+----------------------+----------------------+`,
            formulas: [
              "Time Complexity: T(n) = c_1 \\cdot n + c_2 = O(n)",
              "Row-Major 2D Address: Loc(A[i][j]) = Base + (i \\cdot C + j) \\times W",
              "Column-Major 2D Address: Loc(A[i][j]) = Base + (j \\cdot R + i) \\times W"
            ],
            advantages: [
              "Optimizes computational speed and minimizes latency.",
              "Provides reusable, scalable software design building blocks.",
              "Enables effective memory resource allocation and cache utilization."
            ],
            limitations: [
              "Improper data structure choice causes exponential slowdowns ($O(2^n)$ vs $O(n\\log n)$).",
              "Fixed-size structures (arrays) suffer from static memory allocation inflexibility."
            ],
            applications: [
              "Database indexing using B+ Trees",
              "Network routing tables using Shortest Path Graph algorithms",
              "Compiler syntax analysis using Stack evaluation"
            ],
            solvedProblem: {
              problemStatement: "Calculate the time complexity of the following nested loop:\nfor(int i=1; i<=n; i++) {\n  for(int j=1; j<=i; j++) {\n    sum += 1;\n  }\n}",
              stepByStepSolution: [
                "Outer loop executes for i = 1, 2, 3, ..., n.",
                "Inner loop executes 'i' times for each iteration of the outer loop.",
                "Total basic operations: S = 1 + 2 + 3 + ... + n = n(n + 1)/2 = n^2/2 + n/2.",
                "Dropping lower-order terms and constant factors yields O(n^2)."
              ],
              finalAnswer: "T(n) = O(n^2) (Quadratic Time Complexity)"
            },
            codeSnippet: {
              language: "c",
              title: "Array Address Computation in C",
              code: `#include <stdio.h>

int main() {
    int arr[3][4] = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
    int rows = 3, cols = 4;
    int target_i = 1, target_j = 2; // arr[1][2] = 7

    // Base address and memory element size
    long base = (long)&arr[0][0];
    int element_size = sizeof(int);

    long calculated_addr = base + (target_i * cols + target_j) * element_size;
    printf("Base Address: %p\\n", (void*)base);
    printf("Direct Pointer: %p | Val: %d\\n", &arr[target_i][target_j], arr[target_i][target_j]);
    printf("Row-Major Calculated: %p | Val: %d\\n", (void*)calculated_addr, *(int*)calculated_addr);

    return 0;
}`,
              explanation: "Demonstrates C row-major memory mapping calculation: Base + (i * cols + j) * sizeof(type)."
            },
            importantQuestions: [
              {
                question: "Explain the differences between Big-O, Omega, and Theta notations with graphical representations.",
                marks: 5,
                answerSummary: "Big-O provides an asymptotic upper bound f(n) <= c*g(n); Omega provides a lower bound f(n) >= c*g(n); Theta denotes a tight bound c1*g(n) <= f(n) <= c2*g(n) for n >= n0."
              },
              {
                question: "Derive the address calculation formula for a 2D array stored in column-major order.",
                marks: 5,
                answerSummary: "Loc(A[i][j]) = Base + ((j - LBC)*numRows + (i - LBR)) * sizeof(element), where LBR and LBC are lower bounds for rows and columns."
              }
            ],
            vivaQuestions: [
              {
                question: "What is an Abstract Data Type (ADT)?",
                answer: "An ADT is a mathematical model for data types where the data type is defined by its behavior (operations) from the point of view of a user, independent of implementation details."
              },
              {
                question: "What is the difference between static and dynamic data structures?",
                answer: "Static structures have fixed memory size allocated at compile-time (e.g. static arrays), while dynamic structures allocate and free memory during runtime on the heap (e.g. linked lists)."
              }
            ],
            quickRevisionPoints: [
              "O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)",
              "Row-major stores row-by-row in continuous memory; Column-major stores column-by-column.",
              "Sparse matrices are efficiently represented using 3-tuple format: (row, column, value)."
            ],
            associatedVisualizer: "complexity"
          },
          "Sorting Algorithms & Comparisons": {
            title: "Comprehensive Sorting: Bubble, Selection, Insertion, Merge, Quick & Radix Sort",
            subtopics: [
              "Bubble Sort & Optimization",
              "Selection Sort & In-Place Swapping",
              "Insertion Sort & Adaptive Behavior",
              "Divide & Conquer: Merge Sort",
              "Quick Sort & Pivot Partitioning (Hoare/Lomuto)",
              "Non-Comparative Radix Sort"
            ],
            conceptExplanation: `Sorting rearranges records into ascending or descending key order.
1. **Bubble Sort**: Repeatedly swaps adjacent out-of-order elements ($O(n^2)$ worst, $O(n)$ best with boolean flag).
2. **Selection Sort**: Repeatedly finds minimum in unsorted sub-array and places it at beginning ($O(n^2)$ always, in-place, unstable).
3. **Insertion Sort**: Builds sorted array one item at a time by shifting larger elements right ($O(n^2)$ worst, $O(n)$ best for nearly sorted data).
4. **Merge Sort**: Divides array in halves, recursively sorts, and merges in $O(n \\log n)$ time with $O(n)$ extra space (stable).
5. **Quick Sort**: Partitions around a pivot element so left $\\le$ pivot $\\le$ right. Average $O(n \\log n)$, worst $O(n^2)$ when poorly partitioned.`,
            keyPoints: [
              "Stability: A sort algorithm is stable if equal keys preserve their original relative input order.",
              "In-Place: Uses $O(1)$ or $O(\\log n)$ auxiliary space (e.g., Quick Sort, Heap Sort).",
              "Lower Bound: All comparison-based sorts require at least $\\Omega(n \\log n)$ comparisons in the worst case."
            ],
            realLifeExample: "Sorting a hand of playing cards as you draw them from a deck is the exact mechanical intuition behind Insertion Sort.",
            technicalExample: "V8 JavaScript Engine and Python use **Timsort** (hybrid of Merge Sort and Insertion Sort) for optimal cache locality and $O(n \\log n)$ guaranteed stability.",
            diagramAscii: `Merge Sort (Divide & Conquer):
[38, 27, 43, 3, 9, 82, 10]
          /            \\
  [38, 27, 43, 3]       [9, 82, 10]
    /        \\            /      \\
[38, 27]   [43, 3]     [9, 82]   [10]
   |          |           |        |
Merge -> [3, 27, 38, 43]   Merge -> [9, 10, 82]
           \\                  /
     Combined -> [3, 9, 10, 27, 38, 43, 82]`,
            formulas: [
              "Merge Sort Recurrence: T(n) = 2T(n/2) + O(n) \\implies O(n \\log n)",
              "Quick Sort Worst Recurrence: T(n) = T(n-1) + O(n) \\implies O(n^2)",
              "Radix Sort Time: O(d \\cdot (n + k))"
            ],
            advantages: [
              "Merge Sort guarantees $O(n\\log n)$ performance across all data distributions.",
              "Quick Sort has small constant factors and exceptional CPU cache efficiency.",
              "Insertion Sort is optimal for small ($n < 50$) or nearly sorted datasets."
            ],
            limitations: [
              "Merge Sort requires $O(n)$ auxiliary array memory.",
              "Quick Sort degrades to $O(n^2)$ if pivot is repeatedly minimum/maximum without randomized pivoting."
            ],
            applications: [
              "Database indexing & query ORDER BY execution",
              "E-commerce product pricing/ratings filtering",
              "Operating system process scheduling priority queues"
            ],
            solvedProblem: {
              problemStatement: "Trace Merge Sort on the array: [12, 11, 13, 5, 6, 7]. How many total split levels occur?",
              stepByStepSolution: [
                "Level 0: [12, 11, 13, 5, 6, 7]",
                "Level 1 Split: [12, 11, 13] and [5, 6, 7]",
                "Level 2 Split: [12], [11, 13] and [5], [6, 7]",
                "Level 3 Split: [11], [13] and [6], [7]",
                "Merge sublists: [11, 12, 13] and [5, 6, 7]",
                "Final Merge: [5, 6, 7, 11, 12, 13]"
              ],
              finalAnswer: "Number of recursive levels = ceil(log2(6)) = 3 levels. Final Sorted Array = [5, 6, 7, 11, 12, 13]"
            },
            codeSnippet: {
              language: "c",
              title: "Quick Sort Implementation with Lomuto Partition in C",
              code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
              explanation: "Classic C QuickSort implementation using end-element pivot and recursive subarray partitioning."
            },
            importantQuestions: [
              {
                question: "Compare Bubble, Selection, Insertion, Merge, and Quick Sort in terms of Best, Average, Worst Time Complexity, Space Complexity, and Stability.",
                marks: 10,
                answerSummary: "Bubble: O(n)/O(n^2)/O(n^2), O(1), Stable; Selection: O(n^2)/O(n^2)/O(n^2), O(1), Unstable; Insertion: O(n)/O(n^2)/O(n^2), O(1), Stable; Merge: O(n log n)/O(n log n)/O(n log n), O(n), Stable; Quick: O(n log n)/O(n log n)/O(n^2), O(log n), Unstable."
              }
            ],
            vivaQuestions: [
              {
                question: "Why is Quick Sort preferred over Merge Sort for sorting arrays in RAM?",
                answer: "Quick Sort is an in-place sort requiring no auxiliary buffer allocation and possesses high spatial locality of reference which exploits hardware CPU caches much more effectively."
              },
              {
                question: "When does Quick Sort exhibit its worst-case O(n^2) performance?",
                answer: "When the input array is already sorted (ascending or descending) and the algorithm naively picks the first or last element as the pivot."
              }
            ],
            quickRevisionPoints: [
              "Comparison sort lower bound: Omega(n log n).",
              "Radix Sort & Counting Sort achieve linear O(n) time by avoiding direct key comparisons.",
              "Stable sorts preserve the order of duplicate keys."
            ],
            associatedVisualizer: "sorting"
          },
          "Searching & Hashing Techniques": {
            title: "Searching Techniques & Hash Table Collision Resolution",
            subtopics: [
              "Linear Search vs Binary Search",
              "Hash Functions (Division, Mid-Square, Folding, Multiplication)",
              "Collision Resolution: Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)",
              "Collision Resolution: Separate Chaining",
              "Load Factor (alpha) & Rehashing"
            ],
            conceptExplanation: `**Searching** finds the memory location of a target key:
- **Linear Search**: Sequentially inspects each element ($O(n)$ time, works on unsorted lists).
- **Binary Search**: Compares target with middle element on sorted array, halving search interval each step ($O(\\log n)$ time).

**Hashing** maps arbitrary keys into fixed-size integer slots in a hash table using a hash function $h(k)$.
### Collision Resolution Strategies:
1. **Separate Chaining**: Each bucket points to a linked list of records with colliding hash keys.
2. **Open Addressing**: All elements stored directly in the table.
   - *Linear Probing*: $h(k, i) = (h'(k) + i) \\bmod m$ (suffers from Primary Clustering).
   - *Quadratic Probing*: $h(k, i) = (h'(k) + c_1 i + c_2 i^2) \\bmod m$ (reduces clustering).
   - *Double Hashing*: $h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\bmod m$ (best open addressing dispersion).`,
            keyPoints: [
              "Load factor $\\alpha = n / m$ (where $n$ = elements, $m$ = table size).",
              "Average search time for Hash Table with Chaining is $O(1 + \\alpha)$.",
              "Binary Search requires random access memory ($O(1)$ indexing); therefore it cannot be performed in $O(\\log n)$ on standard singly linked lists."
            ],
            realLifeExample: "A dictionary book index or telephone directory acts as a sorted structure allowing binary search, while the student roll number lookup in a college database maps directly using hash tables.",
            technicalExample: "Python's built-in \`dict\` and Java's \`HashMap\` use open-addressing / separate chaining (converting to Red-Black Trees when bucket depth $> 8$) for $O(1)$ amortized lookup.",
            diagramAscii: `Hash Table with Separate Chaining:
Index  Bucket
[0] -> [Key: 50 | Val: "Alice"] -> NULL
[1] -> NULL
[2] -> [Key: 22 | Val: "Bob"]   -> [Key: 42 | Val: "Dave"] -> NULL
[3] -> [Key: 13 | Val: "Carol"] -> NULL`,
            formulas: [
              "Division Method: h(k) = k \\bmod m",
              "Load Factor: \\alpha = n / m",
              "Double Hashing Probe: h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\bmod m"
            ],
            advantages: [
              "Hash tables provide near-instantaneous O(1) average time insert, delete, and lookup operations.",
              "Binary search achieves logarithmic O(log n) searches on large datasets."
            ],
            limitations: [
              "Poor hash functions cause collisions leading to O(n) worst-case degradation.",
              "Hash tables do not maintain sorted order (cannot perform efficient range queries like BSTs)."
            ],
            applications: [
              "Database primary key indexing",
              "Compiler symbol table lookup",
              "Cryptographic password hashing and verification"
            ],
            solvedProblem: {
              problemStatement: "Insert keys: [10, 22, 31, 4, 15, 28, 17] into a hash table of size m = 11 using division method h(k) = k mod 11 and Linear Probing.",
              stepByStepSolution: [
                "h(10) = 10 mod 11 = 10 -> Put at slot 10.",
                "h(22) = 22 mod 11 = 0 -> Put at slot 0.",
                "h(31) = 31 mod 11 = 9 -> Put at slot 9.",
                "h(4) = 4 mod 11 = 4 -> Put at slot 4.",
                "h(15) = 15 mod 11 = 4 (Collision at 4!) -> Probe 5 -> Put at slot 5.",
                "h(28) = 28 mod 11 = 6 -> Put at slot 6.",
                "h(17) = 17 mod 11 = 6 (Collision at 6!) -> Probe 7 -> Put at slot 7."
              ],
              finalAnswer: "Slot 0: 22, Slot 4: 4, Slot 5: 15, Slot 6: 28, Slot 7: 17, Slot 9: 31, Slot 10: 10."
            },
            codeSnippet: {
              language: "c",
              title: "Binary Search in C (Iterative)",
              code: `#include <stdio.h>

int binarySearch(int arr[], int size, int target) {
    int low = 0, high = size - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // Not found
}`,
              explanation: "Iterative binary search algorithm eliminating integer overflow using mid = low + (high - low) / 2."
            },
            importantQuestions: [
              {
                question: "What is primary and secondary clustering in open addressing? How does double hashing resolve them?",
                marks: 5,
                answerSummary: "Primary clustering occurs in linear probing when long occupied runs form. Secondary clustering occurs in quadratic probing when keys with same initial hash follow identical probe sequences. Double hashing uses a second hash function h2(k) as the step size to eliminate both."
              }
            ],
            vivaQuestions: [
              {
                question: "Why do we use (low + (high - low) / 2) instead of (low + high) / 2?",
                answer: "To prevent potential 32-bit signed integer arithmetic overflow when (low + high) exceeds 2,147,483,647."
              }
            ],
            quickRevisionPoints: [
              "Binary Search time: O(log n); requires sorted array.",
              "Linear Probing step size = 1; Quadratic Probing step size = i^2.",
              "Double Hashing requires h2(k) to be relatively prime to table size m."
            ],
            associatedVisualizer: "sorting"
          }
        }
      },
      {
        unitNumber: 2,
        title: "Pointers, Dynamic Memory & Linked Lists",
        hours: 8,
        description: "Pointer arithmetic, dynamic allocation (malloc, calloc, realloc, free), Singly Linked List, Doubly Linked List, Circular Linked List, Polynomial representation and addition, Generalized Linked List.",
        topics: {
          "Pointers & Dynamic Memory Management": {
            title: "Pointers, Memory Allocation & Garbage Collection",
            subtopics: [
              "Pointer Fundamentals & De-referencing",
              "Pointer Arithmetic & Pointer Arrays",
              "malloc, calloc, realloc, free in C",
              "Dangling Pointers, Memory Leaks, Wild Pointers",
              "Garbage Collection Concepts"
            ],
            conceptExplanation: `A **Pointer** is a variable that stores the hexadecimal memory address of another variable.
- \`malloc(size)\`: Allocates uninitialized contiguous byte block on the heap.
- \`calloc(n, size)\`: Allocates and initializes memory to zero.
- \`realloc(ptr, new_size)\`: Resizes previously allocated dynamic heap block.
- \`free(ptr)\`: Deallocates dynamic memory back to the OS runtime heap.

### Common Pointer Anomalies:
1. **Dangling Pointer**: Points to deallocated memory after \`free()\`.
2. **Memory Leak**: Dynamically allocated heap memory that lost all reachable references without being freed.
3. **Wild Pointer**: Uninitialized pointer pointing to arbitrary memory location.`,
            keyPoints: [
              "sizeof(pointer) depends on CPU architecture (4 bytes on 32-bit, 8 bytes on 64-bit systems).",
              "Always set freed pointers to \`NULL\` to prevent accidental dangling pointer dereferences."
            ],
            realLifeExample: "A house address written on a notepad is a pointer. If the house is demolished (memory freed) but you still visit that address, you encounter a dangling pointer.",
            technicalExample: "C dynamic data structures utilize pointer chains where each node contains data and an address pointer to subsequent allocated heap nodes.",
            diagramAscii: `Heap Memory Allocation:
+--------------------+--------------------------------+
| Pointer on Stack   | Allocated Block on Heap        |
| [ptr: 0x7FFF0040] -------------> [Node: Data | Next]|
+--------------------+--------------------------------+`,
            formulas: ["Pointer Arithmetic: Address(ptr + i) = Address(ptr) + i \\times sizeof(*ptr)"],
            advantages: ["Enables flexible dynamic data structures sized at runtime.", "Facilitates pass-by-reference and shared buffer access without copying."],
            limitations: ["Manual memory management risks memory leaks, segmentation faults, and buffer overflows."],
            applications: ["Kernel memory management", "Graph and tree node pointer linkages", "Dynamic string buffers"],
            solvedProblem: {
              problemStatement: "If int *p = (int*)0x1000 and sizeof(int) is 4 bytes, what is the value of p + 3?",
              stepByStepSolution: [
                "Address(p + 3) = Base + 3 * sizeof(int)",
                "Address = 0x1000 + 3 * 4 = 0x1000 + 12 (0x0C in hex)",
                "Calculated address = 0x100C"
              ],
              finalAnswer: "0x100C"
            },
            codeSnippet: {
              language: "c",
              title: "Safe Heap Memory Allocation in C",
              code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int*)malloc(5 * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Memory allocation failed!\\n");
        return 1;
    }
    for (int i = 0; i < 5; i++) arr[i] = (i + 1) * 10;
    
    free(arr);
    arr = NULL; // Prevent dangling pointer
    return 0;
}`,
              explanation: "Demonstrates malloc safety check, memory usage, and setting pointer to NULL post-free."
            },
            importantQuestions: [
              {
                question: "Explain differences between malloc() and calloc(). What is a memory leak and how can it be detected?",
                marks: 5,
                answerSummary: "malloc allocates uninitialized bytes; calloc allocates and zeroes memory. Memory leak happens when allocated heap memory is not freed; detected using tools like Valgrind."
              }
            ],
            vivaQuestions: [
              {
                question: "What is a void pointer (void*)?",
                answer: "A generic pointer that has no associated data type and can hold the address of any object, but cannot be directly dereferenced without explicit type-casting."
              }
            ],
            quickRevisionPoints: [
              "Always check if (ptr == NULL) after allocation.",
              "calloc(n, size) is equivalent to malloc(n*size) + memset(0).",
              "Garbage collectors in Java/Python use Mark & Sweep or Reference Counting."
            ],
            associatedVisualizer: "dsa"
          },
          "Linked Lists: Singly, Doubly & Circular": {
            title: "Singly, Doubly, Circular Linked Lists & Applications",
            subtopics: [
              "Node Structure & Pointer Links",
              "Singly Linked List (Insert at Head, Tail, Position; Delete; Search; Reverse)",
              "Doubly Linked List (Prev/Next Pointers, Bi-directional Traversal)",
              "Circular Linked Lists & Round-Robin Applications",
              "Polynomial Representation and Addition",
              "Generalized Linked List (GLL)"
            ],
            conceptExplanation: `A **Linked List** is a linear collection of data elements called *nodes*, where linear order is given by stored pointer references rather than physical physical memory contiguity.

### Variations:
1. **Singly Linked List**: Each node contains \`data\` and \`next\` pointer.
2. **Doubly Linked List**: Each node contains \`prev\`, \`data\`, and \`next\` pointer (enables $O(1)$ predecessor deletion and bidirectional traversal).
3. **Circular Linked List**: The last node points back to the \`head\` node rather than \`NULL\`.
4. **Polynomial Addition**: Nodes store \`coefficient\` and \`exponent\` sorted in descending order of exponents.`,
            keyPoints: [
              "Insertion/Deletion at head is $O(1)$ time.",
              "Accessing the $k$-th element requires $O(k)$ sequential traversal.",
              "Reversing a singly linked list in-place requires 3 pointers: \`prev\`, \`curr\`, \`next\`."
            ],
            realLifeExample: "A music playlist where songs play sequentially represents a linked list; a repeating loop playlist is a Circular Linked List.",
            technicalExample: "Memory heap management allocators maintain an internal Free List of available memory blocks as a doubly linked list.",
            diagramAscii: `Singly Linked List:
[Head] -> [Data: 10 | Next] -> [Data: 20 | Next] -> [Data: 30 | NULL]

Doubly Linked List:
NULL <- [Prev | 10 | Next] <===> [Prev | 20 | Next] <===> [Prev | 30 | Next] -> NULL`,
            formulas: ["Polynomial term node: struct Node { int coeff; int exp; struct Node* next; }"],
            advantages: [
              "Dynamic size allocation (no overflow until RAM is exhausted).",
              "Constant-time $O(1)$ insertions and deletions given node pointers without array shifting."
            ],
            limitations: [
              "Extra memory overhead for storing pointers (4-8 bytes per node).",
              "No direct index-based random access ($O(n)$ search)."
            ],
            applications: [
              "Undo/Redo buffers in word processors (Doubly Linked List)",
              "OS process round-robin CPU scheduling (Circular Linked List)",
              "Symbolic polynomial algebraic arithmetic"
            ],
            solvedProblem: {
              problemStatement: "Add two polynomials: P1 = 5x^3 + 4x^2 + 2 and P2 = 3x^2 + 7x + 1 using linked lists.",
              stepByStepSolution: [
                "Compare exponents of current terms in P1 and P2.",
                "P1 has 5x^3 (exp 3 > exp 2 of P2) -> Result = 5x^3.",
                "Both have exp 2: coeff = 4 + 3 = 7 -> Result = 5x^3 + 7x^2.",
                "P2 has 7x^1 (exp 1) -> Result = 5x^3 + 7x^2 + 7x.",
                "Both have exp 0: coeff = 2 + 1 = 3 -> Result = 5x^3 + 7x^2 + 7x + 3."
              ],
              finalAnswer: "Sum = 5x^3 + 7x^2 + 7x + 3"
            },
            codeSnippet: {
              language: "c",
              title: "In-Place Singly Linked List Reversal in C",
              code: `struct Node {
    int data;
    struct Node* next;
};

struct Node* reverseList(struct Node* head) {
    struct Node *prev = NULL, *curr = head, *next = NULL;
    while (curr != NULL) {
        next = curr->next; // Store next
        curr->next = prev; // Reverse current node's pointer
        prev = curr;       // Move prev one step forward
        curr = next;       // Move curr one step forward
    }
    return prev; // New head
}`,
              explanation: "Reverses a singly linked list in-place in O(n) time and O(1) auxiliary space."
            },
            importantQuestions: [
              {
                question: "Write an algorithm to detect and remove a loop in a Singly Linked List using Floyd's Cycle Detection.",
                marks: 10,
                answerSummary: "Use slow (1 step) and fast (2 steps) pointers. If they meet, loop exists. Reset slow to head, advance both 1 step at a time; their collision point is the loop start node. Set previous node's next to NULL."
              }
            ],
            vivaQuestions: [
              {
                question: "What is the primary advantage of a Doubly Linked List over a Singly Linked List?",
                answer: "A node in a Doubly Linked List can be deleted in O(1) time without traversing from the head to locate its predecessor."
              }
            ],
            quickRevisionPoints: [
              "Floyd's Tortoise and Hare detects cycles in O(n) time and O(1) space.",
              "Circular linked lists eliminate NULL checks at end of list.",
              "Header linked lists contain a dummy first node to simplify edge cases."
            ],
            associatedVisualizer: "dsa"
          }
        }
      },
      {
        unitNumber: 3,
        title: "Stacks and Queues",
        hours: 8,
        description: "Stack ADT, Push/Pop, Infix to Postfix conversion, Postfix evaluation, Recursion, Tower of Hanoi, Tail recursion, Queue ADT, Circular Queue, Deque, Priority Queue.",
        topics: {
          "Stacks: Operations, Expressions & Recursion": {
            title: "Stack ADT, Infix/Postfix Evaluation & Tower of Hanoi",
            subtopics: [
              "Stack Operations: Push, Pop, Peek, IsEmpty, IsFull",
              "Array and Linked Implementations",
              "Infix, Prefix and Postfix Notations",
              "Infix to Postfix Conversion Algorithm",
              "Postfix Expression Evaluation using Stacks",
              "Recursion Call Stack & Tower of Hanoi",
              "Tail Recursion Elimination"
            ],
            conceptExplanation: `A **Stack** is a Last-In, First-Out (LIFO) abstract data structure where insertion and deletion occur exclusively at one end called the \`top\`.

### Key Applications:
1. **Expression Evaluation**: Converting human-readable infix ($A + B * C$) to postfix ($A B C * +$) eliminates parentheses and precedence ambiguity.
2. **Backtracking & Recursion**: Runtime call frames are stored in the execution stack.
3. **Tower of Hanoi**: Moving $N$ disks from Source peg to Destination peg using Auxiliary peg takes $2^N - 1$ moves.`,
            keyPoints: [
              "Push and Pop operations run in $O(1)$ time.",
              "Stack Overflow occurs when pushing onto a full static array; Stack Underflow occurs when popping an empty stack.",
              "Tail recursion can be converted directly into an iterative \`while\` loop by the compiler to save stack frames."
            ],
            realLifeExample: "A spring-loaded plate dispenser in a cafeteria or a stack of plates where you can only add or take from the top.",
            technicalExample: "The browser back button history, syntax bracket balancing checking in IDEs, and function call execution stacks in C/C++/Java runtimes.",
            diagramAscii: `Stack LIFO Operation:
     Push(30)       Pop() -> 30
      |    ^         |
      v    |         v
    +----+         +----+
top | 30 |         | 20 | top
    +----+         +----+
    | 20 |         | 10 |
    +----+         +----+
    | 10 |         +----+
    +----+`,
            formulas: [
              "Tower of Hanoi Minimum Moves: M(n) = 2^n - 1",
              "Operator Precedence: ^ (Highest, Right-to-Left) > *, / (Left-to-Right) > +, - (Left-to-Right)"
            ],
            advantages: ["Simple $O(1)$ constant time data insertion and retrieval.", "Automatic nested lifecycle and scope tracking for function calls."],
            limitations: ["Array-backed stacks have fixed capacity constraints.", "Excessive recursion leads to StackOverflow exceptions."],
            applications: ["Compiler parser symbol stacks", "Depth First Search (DFS) graph traversal", "Mathematical expression evaluation"],
            solvedProblem: {
              problemStatement: "Evaluate the postfix expression: '6 2 3 + * 3 8 2 / + * 2 ^ 3 +' using a stack.",
              stepByStepSolution: [
                "Scan '6', '2', '3' -> Push to stack.",
                "Operator '+': Pop 3, 2 -> 2 + 3 = 5. Push 5. (Stack: [6, 5])",
                "Operator '*': Pop 5, 6 -> 6 * 5 = 30. Push 30. (Stack: [30])"
              ],
              finalAnswer: "Value of initial subexpression (6 * (2 + 3)) = 30."
            },
            codeSnippet: {
              language: "c",
              title: "Stack Implementation with Array in C",
              code: `#include <stdio.h>
#define MAX 100

typedef struct {
    int items[MAX];
    int top;
} Stack;

void init(Stack *s) { s->top = -1; }
int isFull(Stack *s) { return s->top == MAX - 1; }
int isEmpty(Stack *s) { return s->top == -1; }

void push(Stack *s, int val) {
    if (!isFull(s)) s->items[++(s->top)] = val;
}

int pop(Stack *s) {
    if (!isEmpty(s)) return s->items[(s->top)--];
    return -1;
}`,
              explanation: "Fixed-size array stack supporting constant-time O(1) push and pop operations."
            },
            importantQuestions: [
              {
                question: "Convert the infix expression ((A + B) * C - (D - E)) ^ (F + G) to postfix notation using a step-by-step stack table.",
                marks: 10,
                answerSummary: "Trace each token through operator stack yielding final postfix string: A B + C * D E - - F G + ^."
              }
            ],
            vivaQuestions: [
              {
                question: "What is tail recursion and why is it desirable?",
                answer: "A recursive call that is the very last operation executed in a function. Compilers can optimize it into iteration without creating new stack frames (Tail Call Optimization)."
              }
            ],
            quickRevisionPoints: [
              "Stack is LIFO; Queue is FIFO.",
              "Infix to Postfix uses operator precedence and associativity rules.",
              "Tower of Hanoi with N disks requires 2^N - 1 recursive moves."
            ],
            associatedVisualizer: "recursion"
          },
          "Queues: Linear, Circular, Deque & Priority Queue": {
            title: "Queues: Circular Queue, Double-Ended Queue (Deque) & Priority Queue",
            subtopics: [
              "Queue ADT & Operations (Enqueue, Dequeue, Front, Rear)",
              "Linear Queue Limitations & Memory Waste",
              "Circular Queue & Modulo Arithmetic",
              "Double-Ended Queue (Input-Restricted / Output-Restricted Deque)",
              "Priority Queue Concepts & Applications"
            ],
            conceptExplanation: `A **Queue** is a First-In, First-Out (FIFO) linear data structure where insertions occur at the \`rear\` and deletions occur at the \`front\`.

### Queue Types:
1. **Linear Queue**: Suffers from false overflow when elements are dequeued from the front while rear reaches the array boundary.
2. **Circular Queue**: Resolves false overflow by wrapping pointers using modulo arithmetic:
   $$\\text{rear} = (\\text{rear} + 1) \\bmod \\text{MAX}$$
3. **Double-Ended Queue (Deque)**: Supports insertion and deletion at both ends.
4. **Priority Queue**: Elements are served based on assigned priority rather than arrival sequence (typically implemented with Heaps).`,
            keyPoints: [
              "Circular queue full condition: \`((rear + 1) % MAX) == front\`.",
              "Circular queue empty condition: \`front == -1\`."
            ],
            realLifeExample: "Vehicles waiting at a toll booth or printer jobs lined up in an office print queue follow FIFO queue rules.",
            technicalExample: "OS CPU ready queue, keyboard keystroke buffer, and asynchronous message queues like RabbitMQ and Apache Kafka.",
            diagramAscii: `Circular Queue (Size 5):
      [0] 10 (front)
     /      \\
[4] 50      [1] 20
   \\        /
   [3] 40 - [2] 30 (rear)`,
            formulas: [
              "Enqueue: rear = (rear + 1) % MAX",
              "Dequeue: front = (front + 1) % MAX"
            ],
            advantages: ["Prevents resource starvation with fair first-come, first-served processing.", "Circular buffers maximize array memory utilization."],
            limitations: ["Linear queues suffer from false overflow without pointer resetting."],
            applications: ["Breadth First Search (BFS) graph traversal", "Printer buffer spooling", "Network packet routing buffers"],
            solvedProblem: {
              problemStatement: "In a circular queue of size 5, initial front = 0, rear = 4. What happens when Enqueue(60) is called?",
              stepByStepSolution: [
                "Calculate next rear slot: (rear + 1) % MAX = (4 + 1) % 5 = 0.",
                "Compare next rear with front: next == front (0 == 0).",
                "Condition evaluates to Queue Full / Overflow."
              ],
              finalAnswer: "Queue Overflow. The element cannot be inserted."
            },
            codeSnippet: {
              language: "c",
              title: "Circular Queue in C",
              code: `#include <stdio.h>
#define SIZE 5

int items[SIZE], front = -1, rear = -1;

int isFull() {
    return (front == (rear + 1) % SIZE);
}

int isEmpty() {
    return (front == -1);
}

void enqueue(int element) {
    if (isFull()) {
        printf("Queue is Full!\\n");
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % SIZE;
    items[rear] = element;
}`,
              explanation: "Standard modulo arithmetic implementation of circular queue avoiding false overflow."
            },
            importantQuestions: [
              {
                question: "Explain the working of a Circular Queue. Why is it preferred over a Linear Queue?",
                marks: 5,
                answerSummary: "Linear queues waste unused front slots after dequeues; circular queue uses modulo indexing to wrap around and reuse emptied memory slots."
              }
            ],
            vivaQuestions: [
              {
                question: "What is a Deque?",
                answer: "A Double-Ended Queue where elements can be added or removed from either the front or the rear end."
              }
            ],
            quickRevisionPoints: [
              "Enqueue at rear, Dequeue at front.",
              "Circular queue full when (rear + 1) % N == front.",
              "Priority queues are most efficiently implemented using Binary Heaps in O(log n) time."
            ],
            associatedVisualizer: "dsa"
          }
        }
      },
      {
        unitNumber: 4,
        title: "Trees, Binary Search Trees, AVL Trees & Heaps",
        hours: 8,
        description: "Binary Trees, Complete Binary Trees, Traversals (Inorder, Preorder, Postorder), Binary Search Trees (BST), AVL Trees (Rotations: LL, RR, LR, RL), Heaps, Heap Sort, Huffman Algorithm, B-Trees & B+ Trees.",
        topics: {
          "Binary Trees & Tree Traversals": {
            title: "Binary Trees, Tree Traversals (Inorder, Preorder, Postorder) & BST",
            subtopics: [
              "Tree Terminologies: Root, Degree, Height, Depth, Level",
              "Binary Tree Types: Full, Complete, Perfect, Degenerate",
              "Recursive & Iterative Traversals: Inorder, Preorder, Postorder",
              "Binary Search Tree (BST) Properties & Operations (Insert, Search, Delete)",
              "Threaded Binary Trees"
            ],
            conceptExplanation: `A **Binary Tree** is a non-linear hierarchical data structure where each node has at most two children (\`left\` and \`right\`).

### Traversals:
- **Preorder (Root, Left, Right)**: Used for cloning/serializing trees.
- **Inorder (Left, Root, Right)**: Outputs keys in non-decreasing order on a Binary Search Tree (BST).
- **Postorder (Left, Right, Root)**: Used for deleting tree nodes bottom-up and postfix evaluation.

### Binary Search Tree (BST) Property:
For every node $X$, all keys in the left subtree $< X.key$ and all keys in the right subtree $> X.key$.`,
            keyPoints: [
              "A binary tree of height $h$ contains at most $2^{h+1} - 1$ nodes.",
              "BST search, insert, and delete take $O(h)$ time, which is $O(\\log n)$ when balanced and $O(n)$ when skewed."
            ],
            realLifeExample: "Corporate executive organization charts and folder directory structures in an operating system filesystem.",
            technicalExample: "Database query optimizer parse trees and DOM (Document Object Model) trees in web browsers.",
            diagramAscii: `Binary Search Tree (BST):
        (50)
       /    \\
    (30)    (70)
    /  \\    /  \\
  (20)(40)(60)(80)

Inorder: 20, 30, 40, 50, 60, 70, 80 (Sorted!)`,
            formulas: [
              "Max nodes at level i: 2^i",
              "Max nodes in tree of height h: 2^(h+1) - 1",
              "Min height for n nodes: ceil(log2(n + 1)) - 1"
            ],
            advantages: ["Dynamic hierarchical data representation.", "BST provides average O(log n) search, insert, and delete."],
            limitations: ["Unbalanced BSTs degrade to O(n) degenerate linked lists on sorted input."],
            applications: ["Auto-complete dictionary prefix trees (Tries)", "File system hierarchies", "Huffman compression coding"],
            solvedProblem: {
              problemStatement: "Construct a BST from insertions: [50, 30, 20, 40, 70, 60, 80]. Give its Postorder traversal.",
              stepByStepSolution: [
                "Insert 50 (Root).",
                "30 < 50 -> Left of 50. 20 < 30 -> Left of 30. 40 > 30 -> Right of 30.",
                "70 > 50 -> Right of 50. 60 < 70 -> Left of 70. 80 > 70 -> Right of 70.",
                "Postorder traversal (Left, Right, Root): 20, 40, 30, 60, 80, 70, 50."
              ],
              finalAnswer: "Postorder: [20, 40, 30, 60, 80, 70, 50]"
            },
            codeSnippet: {
              language: "c",
              title: "BST Insert & Inorder Traversal in C",
              code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key;
    struct Node *left, *right;
};

struct Node* createNode(int item) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->key = item;
    temp->left = temp->right = NULL;
    return temp;
}

struct Node* insert(struct Node* node, int key) {
    if (node == NULL) return createNode(key);
    if (key < node->key) node->left = insert(node->left, key);
    else if (key > node->key) node->right = insert(node->right, key);
    return node;
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->key);
        inorder(root->right);
    }
}`,
              explanation: "Standard recursive insertion and inorder traversal on a Binary Search Tree."
            },
            importantQuestions: [
              {
                question: "Explain the algorithm to delete a node with two children from a Binary Search Tree.",
                marks: 5,
                answerSummary: "Find the inorder successor (smallest node in the right subtree). Copy its value to the target node, then recursively delete the inorder successor node (which has at most one child)."
              }
            ],
            vivaQuestions: [
              {
                question: "What traversal of a BST produces elements in strictly ascending order?",
                answer: "Inorder traversal (Left, Root, Right)."
              }
            ],
            quickRevisionPoints: [
              "BST Inorder traversal = Sorted output.",
              "Complete binary tree has all levels completely filled except possibly the last level.",
              "Deleting node with 2 children replaces it with its Inorder Successor or Predecessor."
            ],
            associatedVisualizer: "dsa"
          },
          "Self-Balancing AVL Trees & Heaps": {
            title: "AVL Trees (Rotations), Binary Heaps & Heap Sort",
            subtopics: [
              "AVL Balance Factor: BF = Height(Left) - Height(Right)",
              "AVL Rotations: LL, RR, LR, RL",
              "Max-Heap and Min-Heap Properties",
              "Heapify Algorithm & Heap Creation",
              "Heap Sort Algorithm & Analysis",
              "B-Trees and B+ Trees Overview"
            ],
            conceptExplanation: `An **AVL Tree** is a self-balancing BST where the balance factor of every node satisfies:
$$\\text{Balance Factor} \\in \\{-1, 0, +1\\}$$
When insertion or deletion causes an imbalance ($|BF| > 1$), balancing is restored via 4 rotation types:
1. **LL Rotation (Single Right)**: Fixed with a single right rotation.
2. **RR Rotation (Single Left)**: Fixed with a single left rotation.
3. **LR Rotation (Double)**: Left rotation on child, then Right rotation on root.
4. **RL Rotation (Double)**: Right rotation on child, then Left rotation on root.

A **Binary Heap** is a complete binary tree satisfying the heap property (Max-Heap: parent $\\ge$ children; Min-Heap: parent $\\le$ children).`,
            keyPoints: [
              "AVL trees guarantee strictly $O(\\log n)$ worst-case search, insert, and delete operations.",
              "Building a heap from an unsorted array takes $O(n)$ time using Floyd's bottom-up heapify.",
              "Heap Sort runs in $O(n \\log n)$ time in-place and is unstable."
            ],
            realLifeExample: "Hospital emergency triage prioritization processes the most critical patients first using a Priority Queue / Max-Heap.",
            technicalExample: "B+ Trees are used in database storage engines (MySQL InnoDB) to minimize disk I/O seek operations on multi-gigabyte indexes.",
            diagramAscii: `AVL LL Rotation (Right Rotation):
       z (BF = +2)               y (BF = 0)
      /    \\                    /    \\
     y      T3    ===>         x      z
    / \\                       / \\    / \\
   x   T2                    T0  T1 T2  T3
  / \\
 T0  T1`,
            formulas: [
              "Balance Factor: BF(node) = Height(left) - Height(right)",
              "Heap Parent of node i: (i - 1) / 2",
              "Heap Left Child of node i: 2i + 1 | Right Child: 2i + 2"
            ],
            advantages: ["Guarantees logarithmic worst-case search time.", "Heaps allow $O(1)$ lookup of maximum or minimum element."],
            limitations: ["AVL rotations add computational overhead during insertions and deletions."],
            applications: ["Database primary indexes (B-Trees / B+ Trees)", "Priority Queue scheduling in operating systems", "Huffman coding compression trees"],
            solvedProblem: {
              problemStatement: "Given an array [4, 10, 3, 5, 1], build a Max-Heap using bottom-up heapify.",
              stepByStepSolution: [
                "Array representation as complete binary tree: Root=4, Left(4)=10, Right(4)=3, Left(10)=5, Right(10)=1.",
                "Last non-leaf node index = (5/2) - 1 = 1 (Value = 10). Children are 5 and 1. 10 > max(5, 1) -> No swap.",
                "Next node index = 0 (Value = 4). Children are 10 and 3. Max child is 10. Swap 4 and 10.",
                "Subtree at index 1 now has 4 with children 5 and 1. Max child is 5. Swap 4 and 5.",
                "Final Max-Heap array: [10, 5, 3, 4, 1]."
              ],
              finalAnswer: "Max-Heap: [10, 5, 3, 4, 1]"
            },
            codeSnippet: {
              language: "c",
              title: "Heapify and HeapSort in C",
              code: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}`,
              explanation: "In-place Heap Sort algorithm achieving O(n log n) worst-case time complexity."
            },
            importantQuestions: [
              {
                question: "Explain the four rotation cases in AVL trees with before and after diagrams.",
                marks: 10,
                answerSummary: "Detail LL (Right rotation), RR (Left rotation), LR (Left then Right rotation), and RL (Right then Left rotation) to restore balance factor to {-1, 0, +1}."
              }
            ],
            vivaQuestions: [
              {
                question: "Why is building a binary heap O(n) instead of O(n log n)?",
                answer: "Because most nodes reside near the bottom of the tree with small heights; the mathematical summation Sum(h / 2^h) converges to a constant 2, resulting in O(n)."
              }
            ],
            quickRevisionPoints: [
              "AVL Tree is height-balanced: BF in {-1, 0, 1}.",
              "Max-heap root holds the maximum element.",
              "B+ Trees store all actual data records in leaf nodes connected by a linked list."
            ],
            associatedVisualizer: "dsa"
          }
        }
      },
      {
        unitNumber: 5,
        title: "Graphs, Graph Traversals, Spanning Trees & Shortest Paths",
        hours: 8,
        description: "Adjacency Matrix, Adjacency List, BFS, DFS, Connected Components, Prim's and Kruskal's Minimum Spanning Tree (MST), Dijkstra's and Warshall's shortest path algorithms.",
        topics: {
          "Graph Representations & Traversals (BFS & DFS)": {
            title: "Graph Representations & Traversals (BFS and DFS)",
            subtopics: [
              "Graph Definitions: Directed, Undirected, Weighted, Cyclic/Acyclic",
              "Adjacency Matrix vs Adjacency List vs Adjacency Multilist",
              "Breadth-First Search (BFS) using Queues",
              "Depth-First Search (DFS) using Stacks/Recursion",
              "Connected Components & Cycle Detection"
            ],
            conceptExplanation: `A **Graph** $G = (V, E)$ consists of a set of vertices $V$ and edges $E$.

### Representations:
1. **Adjacency Matrix**: $V \\times V$ boolean/weight matrix. Space: $O(V^2)$. Ideal for dense graphs.
2. **Adjacency List**: Array of linked lists where bucket $u$ stores adjacent neighbors. Space: $O(V + E)$. Ideal for sparse graphs.

### Traversals:
- **BFS (Breadth First Search)**: Explores all neighbor vertices at current depth before moving deeper (uses a Queue). Computes shortest path in unweighted graphs.
- **DFS (Depth First Search)**: Explores as far as possible along each branch before backtracking (uses a Stack / Recursion). Used in topological sorting and cycle detection.`,
            keyPoints: [
              "BFS time complexity: $O(V + E)$ using Adjacency List.",
              "DFS time complexity: $O(V + E)$ using Adjacency List.",
              "Detecting cycles in directed graphs requires tracking nodes currently in the recursion stack (back-edges)."
            ],
            realLifeExample: "Social networks (Facebook/LinkedIn) where people are vertices and friendships are edges; BFS finds degrees of separation (mutual friends).",
            technicalExample: "Web crawlers use BFS to index web pages level by level starting from seed URLs.",
            diagramAscii: `Graph Traversal:
    (A) --- (B)
     |   \\   |
     |    \\  |
    (C) --- (D)

BFS from A: A -> B -> C -> D
DFS from A: A -> B -> D -> C`,
            formulas: [
              "Max edges in simple undirected graph: V(V - 1) / 2",
              "Handshaking Lemma: Sum(deg(v)) = 2 * |E|"
            ],
            advantages: ["Models complex real-world interconnected networks.", "BFS guarantees shortest path in unweighted graphs."],
            limitations: ["Adjacency matrix consumes wasteful O(V^2) space for sparse graphs."],
            applications: ["GPS route navigation", "Garbage collection reachability analysis", "Deadlock cycle detection in OS resource allocation graphs"],
            solvedProblem: {
              problemStatement: "Perform BFS traversal on a graph with vertices {0,1,2,3,4} and edges {(0,1), (0,2), (1,2), (2,0), (2,3), (3,3)} starting from vertex 2.",
              stepByStepSolution: [
                "Queue: [2], Visited: {2}",
                "Dequeue 2. Neighbors of 2 are 0, 3. Queue: [0, 3], Visited: {2, 0, 3}",
                "Dequeue 0. Neighbors of 0 are 1, 2. (2 already visited). Queue: [3, 1], Visited: {2, 0, 3, 1}",
                "Dequeue 3. Neighbors of 3 is 3 (already visited). Queue: [1]",
                "Dequeue 1. Neighbors of 1 is 2 (already visited). Queue empty.",
                "BFS Order: 2, 0, 3, 1."
              ],
              finalAnswer: "BFS Traversal: [2, 0, 3, 1]"
            },
            codeSnippet: {
              language: "c",
              title: "Breadth First Search (BFS) in C",
              code: `#include <stdio.h>
#define MAX 20

int adj[MAX][MAX], visited[MAX], queue[MAX];
int front = -1, rear = -1;

void bfs(int startNode, int n) {
    front = rear = 0;
    queue[rear] = startNode;
    visited[startNode] = 1;

    while (front <= rear) {
        int current = queue[front++];
        printf("%d ", current);

        for (int i = 0; i < n; i++) {
            if (adj[current][i] == 1 && !visited[i]) {
                queue[++rear] = i;
                visited[i] = 1;
            }
        }
    }
}`,
              explanation: "Standard BFS implementation in C using queue and adjacency matrix."
            },
            importantQuestions: [
              {
                question: "Compare BFS and DFS with respect to data structures used, time/space complexity, and practical applications.",
                marks: 10,
                answerSummary: "BFS uses FIFO Queue, O(V+E) time, O(V) width space, finds unweighted shortest paths. DFS uses LIFO Stack/Recursion, O(V+E) time, O(V) height space, finds topological sorting and connected components."
              }
            ],
            vivaQuestions: [
              {
                question: "What is the Handshaking Lemma in Graph Theory?",
                answer: "The sum of degrees of all vertices in an undirected graph equals twice the total number of edges: Sum(deg(v)) = 2|E|."
              }
            ],
            quickRevisionPoints: [
              "BFS uses Queue; DFS uses Stack.",
              "Adjacency list uses O(V+E) space; Adjacency matrix uses O(V^2).",
              "A tree is a connected acyclic graph with exactly V - 1 edges."
            ],
            associatedVisualizer: "graph"
          },
          "Minimum Spanning Trees & Shortest Path Algorithms": {
            title: "Prim's, Kruskal's MST, Dijkstra's & Floyd-Warshall Algorithms",
            subtopics: [
              "Spanning Tree Properties",
              "Kruskal's Algorithm (Greedy, Disjoint Set Union / DSU)",
              "Prim's Algorithm (Greedy, Cut Property)",
              "Dijkstra's Single Source Shortest Path Algorithm",
              "Floyd-Warshall All-Pairs Shortest Path Algorithm"
            ],
            conceptExplanation: `A **Spanning Tree** of a connected graph $G$ is a subgraph that includes all vertices and is a tree with exactly $V - 1$ edges.

### Minimum Spanning Tree (MST):
1. **Kruskal's Algorithm**: Sorts all edges by weight and greedily adds the next lowest weight edge that does not form a cycle (using Disjoint Set Union - DSU). Time: $O(E \\log E)$.
2. **Prim's Algorithm**: Grows a single tree starting from an arbitrary vertex, greedily adding the minimum weight edge connecting the tree to an unvisited vertex. Time: $O(E \\log V)$ with min-heap.

### Shortest Path Algorithms:
- **Dijkstra's Algorithm**: Greedy algorithm for finding the shortest path from a single source to all other vertices in non-negative weighted graphs. Time: $O((V + E) \\log V)$.
- **Floyd-Warshall Algorithm**: Dynamic programming algorithm computing all-pairs shortest paths in $O(V^3)$ time, handling negative edge weights.`,
            keyPoints: [
              "Kruskal's is preferred for sparse graphs ($E \\approx V$); Prim's is preferred for dense graphs ($E \\approx V^2$).",
              "Dijkstra's fails on negative weight cycles (use Bellman-Ford instead)."
            ],
            realLifeExample: "Laying optical fiber cables to connect all university buildings with minimum total cable length represents a Minimum Spanning Tree.",
            technicalExample: "Google Maps routing navigation calculates fastest vehicle routes using optimized bidirectional Dijkstra / A* search.",
            diagramAscii: `Dijkstra's Shortest Path Distance Relaxation:
if (dist[u] + weight(u, v) < dist[v]) {
    dist[v] = dist[u] + weight(u, v);
}`,
            formulas: [
              "Kruskal Time: O(E \\log E) = O(E \\log V)",
              "Floyd-Warshall Transition: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])",
              "Dijkstra Relaxation: d[v] = min(d[v], d[u] + w(u, v))"
            ],
            advantages: ["Guarantees globally optimal network wiring cost.", "Dijkstra computes optimal single-source routes efficiently."],
            limitations: ["Dijkstra does not support negative edge weights."],
            applications: ["Telecommunications network cable layout", "Power grid electrical distribution", "Transportation logistics routing"],
            solvedProblem: {
              problemStatement: "Given a 3-vertex graph with edges: (A, B, 4), (B, C, 2), (A, C, 5). Find the Minimum Spanning Tree weight.",
              stepByStepSolution: [
                "Sorted edges by weight: (B, C, 2), (A, B, 4), (A, C, 5).",
                "Pick (B, C, 2) -> Added (No cycle).",
                "Pick (A, B, 4) -> Added (No cycle). Tree now contains V-1 = 2 edges connecting {A, B, C}.",
                "Total MST Weight = 2 + 4 = 6."
              ],
              finalAnswer: "MST Edges: {(B, C), (A, B)} with Total Weight = 6."
            },
            codeSnippet: {
              language: "c",
              title: "Dijkstra's Algorithm in C",
              code: `#include <stdio.h>
#define INF 99999
#define V 5

int minDistance(int dist[], int sptSet[]) {
    int min = INF, min_index = -1;
    for (int v = 0; v < V; v++)
        if (!sptSet[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    return min_index;
}

void dijkstra(int graph[V][V], int src) {
    int dist[V], sptSet[V];
    for (int i = 0; i < V; i++) {
        dist[i] = INF;
        sptSet[i] = 0;
    }
    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = 1;
        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INF && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }
}`,
              explanation: "Single Source Shortest Path computation using Dijkstra's greedy algorithm."
            },
            importantQuestions: [
              {
                question: "Explain Kruskal's algorithm for finding MST and prove its correctness using the Cut Property.",
                marks: 10,
                answerSummary: "Detail edge sorting, union-find with path compression, cycle prevention, and greedy cut property proof."
              }
            ],
            vivaQuestions: [
              {
                question: "Can a Minimum Spanning Tree contain a cycle?",
                answer: "No. By definition, a tree is a connected acyclic graph with exactly V - 1 edges."
              }
            ],
            quickRevisionPoints: [
              "MST has exactly V - 1 edges and no cycles.",
              "Kruskal's uses Disjoint Set Union (DSU).",
              "Dijkstra finds shortest paths in non-negative weighted graphs in O(V^2) or O(E log V)."
            ],
            associatedVisualizer: "graph"
          }
        }
      }
    ]
  },

  // ==========================================
  // YEAR 2 - SEMESTER 4: OPERATING SYSTEMS (BCS4022 / UCS4013)
  // ==========================================
  UCS4013: {
    code: "UCS4013",
    title: "Operating System",
    semester: 4,
    year: 2,
    credits: 4.0,
    scheme: { L: 3, T: 1, P: 0, CIE: 40, ESE: 60, Total: 100 },
    isElective: false,
    isLab: false,
    department: "CSE",
    iconName: "Server",
    defaultVisualizer: "os",
    description: "Core concepts of process management, CPU scheduling, inter-process synchronization, deadlocks, virtual memory, and file systems.",
    textbooks: [
      "Abraham Silberschatz, Peter Baer Galvin, 'Operating System Concepts', 9th Edition, Wiley.",
      "William Stallings, 'Operating Systems: Internals and Design Principles', 5th Edition, Pearson."
    ],
    referenceBooks: [
      "Andrew S. Tanenbaum, 'Modern Operating Systems', Prentice Hall.",
      "Milan Milenkovic, 'Operating Systems: Concepts and Design', McGraw-Hill."
    ],
    units: [
      {
        unitNumber: 1,
        title: "Introduction to Operating Systems & System Structures",
        hours: 8,
        description: "OS services, classification (Batch, Multi-programmed, Time-sharing, Real-time, Distributed), System Calls, OS Architecture (Monolithic, Layered, Microkernel).",
        topics: {
          "OS Architecture & System Calls": {
            title: "Operating System Services, System Calls & Kernel Architectures",
            subtopics: [
              "OS Definition, Functions & Goals",
              "Classification: Batch, Time-sharing, Multiprocessing, Real-Time (Hard vs Soft)",
              "Dual-Mode Operation (User Mode vs Kernel Mode)",
              "System Calls: Process Control, File Manipulation, Device, Info, Comm",
              "Architecture: Monolithic Kernel vs Microkernel vs Hybrid"
            ],
            conceptExplanation: `An **Operating System (OS)** is a system software that acts as an intermediary between computer hardware and the user applications, responsible for resource management, memory abstraction, process scheduling, and security protection.

### Dual-Mode Operation:
- **User Mode (Mode Bit = 1)**: User applications execute with restricted hardware access.
- **Kernel / Privileged Mode (Mode Bit = 0)**: Operating system kernel executes privileged instructions (direct hardware I/O, memory page tables).
- A **System Call** triggers a software interrupt (trap) transitioning the CPU from User Mode to Kernel Mode.`,
            keyPoints: [
              "Microkernels move non-essential OS services (file system, device drivers) into user-space servers for enhanced stability.",
              "Monolithic kernels run all OS components in a single shared kernel address space for maximum execution speed."
            ],
            realLifeExample: "The government of a country acts like an OS: it does not perform all economic work directly, but provides laws, roads, and currency infrastructure that allow citizens (apps) to operate securely.",
            technicalExample: "In Linux, executing \`fork()\`, \`read()\`, \`write()\`, and \`open()\` transitions the execution thread into kernel space via \`syscall\` instruction (x86_64).",
            diagramAscii: `Dual Mode Operation & System Call Transition:
+--------------------------------------------------------+
| USER MODE (Mode Bit = 1)                               |
|   User Application calls write()                       |
+---------------------------|----------------------------+
                            | Trap / System Call
+---------------------------v----------------------------+
| KERNEL MODE (Mode Bit = 0)                             |
|   Execute sys_write() handler in kernel                |
|   Return from System Call (sysret)                     |
+---------------------------|----------------------------+
                            v
   Resumes User Application execution`,
            formulas: ["Mode Transition: User (1) -> Trap (0) -> Kernel Handler -> Return (1)"],
            advantages: ["Protects critical hardware from erroneous or malicious user software.", "Provides standardized hardware abstraction APIs (POSIX)."],
            limitations: ["Mode switching and context switching incur CPU pipeline overhead."],
            applications: ["Desktop OS (Windows, macOS, Linux)", "Smartphone OS (Android, iOS)", "Real-time embedded automotive systems (QNX, VxWorks)"],
            solvedProblem: {
              problemStatement: "What is the primary architectural difference between Mach (Microkernel) and Linux (Monolithic Kernel)?",
              stepByStepSolution: [
                "Linux Monolithic: VFS, Networking, Device Drivers, Schedulers all run in Kernel space -> Fast, but one driver crash can panic the kernel.",
                "Mach Microkernel: Only IPC, basic memory paging, and CPU scheduling remain in kernel; Drivers and File systems run as user-space daemons -> Highly fault-tolerant, but IPC context switch overhead is higher."
              ],
              finalAnswer: "Linux runs all subsystems in kernel space; Mach executes drivers/filesystems in user space communicating via IPC."
            },
            codeSnippet: {
              language: "c",
              title: "Linux System Call Example (fork and getpid)",
              code: `#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>

int main() {
    pid_t pid = fork();

    if (pid < 0) {
        perror("Fork Failed");
        return 1;
    } else if (pid == 0) {
        // Child Process
        printf("Child Process: PID = %d, Parent PID = %d\\n", getpid(), getppid());
    } else {
        // Parent Process
        printf("Parent Process: PID = %d, Created Child = %d\\n", getpid(), pid);
    }
    return 0;
}`,
              explanation: "Demonstrates fork() system call creating an exact clone child process in Linux."
            },
            importantQuestions: [
              {
                question: "Differentiate between Monolithic Kernel and Microkernel architecture with diagrams.",
                marks: 10,
                answerSummary: "Contrast architecture, location of device drivers/filesystems, speed, fault tolerance, and examples (Linux vs Minix/QNX)."
              }
            ],
            vivaQuestions: [
              {
                question: "What is a trap in an operating system?",
                answer: "A software-generated interrupt caused either by an exceptional condition (e.g. division by zero, invalid memory access) or by an explicit system call instruction."
              }
            ],
            quickRevisionPoints: [
              "Dual mode: User mode (bit=1) vs Kernel mode (bit=0).",
              "System calls provide the programming interface between a process and the OS.",
              "Hard Real-Time systems guarantee strict deadline completion without exception."
            ],
            associatedVisualizer: "os"
          }
        }
      },
      {
        unitNumber: 2,
        title: "Process Management, CPU Scheduling & Deadlocks",
        hours: 8,
        description: "Process states, PCB, Schedulers (Long/Medium/Short-term), Scheduling algorithms (FCFS, SJF, SRTF, RR, Priority), Real-time scheduling (RM, EDF), Deadlock conditions, Prevention, Banker's Algorithm avoidance.",
        topics: {
          "CPU Scheduling Algorithms & Gantt Charts": {
            title: "CPU Scheduling: FCFS, SJF, SRTF, Round Robin & Priority Scheduling",
            subtopics: [
              "Process States: New, Ready, Running, Waiting, Terminated",
              "Process Control Block (PCB) & Context Switching",
              "Scheduling Criteria: CPU Utilization, Throughput, Turnaround Time, Waiting Time, Response Time",
              "Non-Preemptive vs Preemptive Scheduling",
              "Algorithms: FCFS, SJF, Shortest Remaining Time First (SRTF), Round Robin (RR), Priority Scheduling",
              "Multi-Level Feedback Queue (MLFQ)"
            ],
            conceptExplanation: `**CPU Scheduling** decides which ready process is allocated CPU execution time.

### Key Metrics:
- **Turnaround Time (TAT)**: $\\text{Completion Time} - \\text{Arrival Time}$
- **Waiting Time (WT)**: $\\text{Turnaround Time} - \\text{Burst Time}$
- **Response Time (RT)**: Time from arrival to first CPU allocation.

### Algorithms:
1. **FCFS**: First-Come, First-Served (non-preemptive, suffers from Convoy Effect).
2. **SJF / SRTF**: Shortest Job First (minimizes average waiting time; preemptive version is SRTF).
3. **Round Robin (RR)**: Preemptive time-sliced sharing ($q$). When $q \\to \\infty$, becomes FCFS; when $q \\to 0$, high context switch overhead.
4. **Priority Scheduling**: Allocates CPU to highest priority process (suffers from starvation, resolved via Aging).`,
            keyPoints: [
              "SJF is provably optimal in yielding the minimum average waiting time.",
              "Round Robin performance strongly depends on Time Quantum ($q$): typically chosen so 80% of CPU bursts are shorter than $q$."
            ],
            realLifeExample: "Customers standing in line at a grocery store checkout represent FCFS; an express lane for 5 items or fewer represents Shortest Job First.",
            technicalExample: "The Linux kernel uses the Completely Fair Scheduler (CFS) with Red-Black Trees to achieve $O(1)$ picking of the next process with the lowest virtual runtime (\`vruntime\`).",
            diagramAscii: `Process State Transition Diagram:
              [New]
                |
                v (Admitted)
+--------> [Ready] <--------+ (Time Quantum Expired / Preempted)
|            |              |
|            v (Scheduler)  |
|         [Running] --------+
|            |
|            v (I/O or Event Wait)
+------ [Waiting/Blocked]`,
            formulas: [
              "Turnaround Time (TAT) = Completion Time - Arrival Time",
              "Waiting Time (WT) = Turnaround Time - Burst Time",
              "Average Waiting Time = Sum(WT_i) / N"
            ],
            advantages: ["Round Robin ensures interactive fairness.", "SJF maximizes system throughput and minimizes waiting times."],
            limitations: ["SJF cannot predict exact future CPU burst lengths without exponential smoothing estimation."],
            applications: ["Operating system thread schedulers", "Cloud container autoscaling task runners", "Real-time avionics schedulers"],
            solvedProblem: {
              problemStatement: "Processes P1, P2, P3 arrive at time 0 with Burst Times: P1=24ms, P2=3ms, P3=3ms. Calculate Average Waiting Time for FCFS.",
              stepByStepSolution: [
                "Gantt Chart: [P1: 0 to 24] -> [P2: 24 to 27] -> [P3: 27 to 30]",
                "Waiting Time P1 = 0 ms",
                "Waiting Time P2 = 24 ms",
                "Waiting Time P3 = 27 ms",
                "Average WT = (0 + 24 + 27) / 3 = 51 / 3 = 17.0 ms."
              ],
              finalAnswer: "Average Waiting Time = 17.0 ms (Notice huge Convoy Effect caused by long process P1 running first)."
            },
            codeSnippet: {
              language: "c",
              title: "Round Robin Scheduling Algorithm in C",
              code: `#include <stdio.h>

void calculateRoundRobin(int n, int bt[], int quantum) {
    int rem_bt[n], wt[n], tat[n], t = 0;
    for (int i = 0; i < n; i++) rem_bt[i] = bt[i];

    while (1) {
        int done = 1;
        for (int i = 0; i < n; i++) {
            if (rem_bt[i] > 0) {
                done = 0;
                if (rem_bt[i] > quantum) {
                    t += quantum;
                    rem_bt[i] -= quantum;
                } else {
                    t += rem_bt[i];
                    wt[i] = t - bt[i];
                    rem_bt[i] = 0;
                }
            }
        }
        if (done == 1) break;
    }
    for (int i = 0; i < n; i++) tat[i] = bt[i] + wt[i];
}`,
              explanation: "Round Robin scheduler simulation tracking remaining burst times and computing TAT and WT."
            },
            importantQuestions: [
              {
                question: "Given a set of 4 processes with Arrival and Burst times, construct the Gantt chart and compute Average Turnaround Time and Waiting Time under Round Robin (q=2) and SRTF.",
                marks: 10,
                answerSummary: "Step-by-step Gantt chart generation showing preemption moments and calculation tables for Completion, TAT, and WT."
              }
            ],
            vivaQuestions: [
              {
                question: "What is the Convoy Effect in CPU scheduling?",
                answer: "A situation in FCFS where short processes wait a long time for a single CPU-heavy process to release the CPU, leading to poor CPU and device utilization."
              },
              {
                question: "What is Aging?",
                answer: "A technique of gradually increasing the priority of processes that wait in the system for a long time, preventing indefinite starvation."
              }
            ],
            quickRevisionPoints: [
              "TAT = CT - AT; WT = TAT - BT.",
              "SJF gives minimum average waiting time.",
              "Aging solves process starvation in Priority Scheduling."
            ],
            associatedVisualizer: "os"
          },
          "Deadlocks: Detection, Prevention & Banker's Algorithm": {
            title: "Deadlock Characterization, Prevention, Avoidance & Banker's Algorithm",
            subtopics: [
              "Deadlock Definition & Necessary Coffman Conditions",
              "Resource Allocation Graph (RAG)",
              "Deadlock Prevention (Invalidating Coffman conditions)",
              "Deadlock Avoidance: Banker's Safety Algorithm",
              "Deadlock Detection & Recovery Strategies"
            ],
            conceptExplanation: `A **Deadlock** is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process in the set.

### 4 Necessary Coffman Conditions:
1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process must be holding at least one resource and waiting to acquire additional resources held by others.
3. **No Preemption**: Resources cannot be forcibly preempted; only released voluntarily.
4. **Circular Wait**: A closed chain of processes exists such that $P_0$ waits for $P_1$, $P_1$ waits for $P_2$, ..., and $P_n$ waits for $P_0$.

**Banker's Algorithm** dynamically examines resource allocation state to ensure a **Safe Sequence** $\\langle P_1, P_2, \\dots, P_n \\rangle$ exists where every process can satisfy its maximum remaining needs with current available resources.`,
            keyPoints: [
              "If a system is in a Safe State, no deadlock can occur.",
              "Need Matrix calculation: $\\text{Need}[i][j] = \\text{Max}[i][j] - \\text{Allocation}[i][j]$."
            ],
            realLifeExample: "Traffic gridlock at a four-way intersection where every car occupies the space the next car needs to advance.",
            technicalExample: "Database transactions simultaneously executing \`UPDATE accounts SET bal = bal - 100 WHERE id = 1\` and vice versa on record \`id = 2\` without lock ordering.",
            diagramAscii: `Resource Allocation Graph (RAG) Deadlock Cycle:
    [Process P1] --------Requests-------> (Resource R1)
         ^                                     |
         |                                     |
     Allocated                             Allocated
         |                                     |
         |                                     v
    (Resource R2) <------Requests-------- [Process P2]`,
            formulas: [
              "Need Matrix: Need[i][j] = Max[i][j] - Allocation[i][j]",
              "Safety Test: Work = Available; if (Need_i <= Work) { Work += Allocation_i; finish[i] = true; }"
            ],
            advantages: ["Banker's algorithm avoids deadlocks dynamically without rigid resource ordering restrictions."],
            limitations: ["Requires processes to declare their maximum resource requirements in advance, which is rarely realistic."],
            applications: ["DBMS transaction concurrency managers", "OS kernel resource managers", "Embedded robotics multi-actuator coordinators"],
            solvedProblem: {
              problemStatement: "System with 5 processes (P0-P4) and 3 resources (A:10, B:5, C:7). Current Available is [3, 3, 2]. P0 Need is [7,4,3], P1 Need is [1,2,2]. Can P1 execute first?",
              stepByStepSolution: [
                "Compare P1 Need [1, 2, 2] with Available [3, 3, 2]: Need <= Available (1<=3, 2<=3, 2<=2) -> TRUE.",
                "P1 can finish and release its allocation to Available.",
                "P0 Need [7, 4, 3] > Available [3, 3, 2] -> P0 cannot execute first."
              ],
              finalAnswer: "P1 can execute safely; P0 must wait."
            },
            codeSnippet: {
              language: "c",
              title: "Banker's Safety Algorithm in C",
              code: `#include <stdio.h>
#define P 5
#define R 3

int isSafe(int processes[], int avail[], int max[][R], int allot[][R]) {
    int need[P][R], finish[P] = {0}, safeSeq[P], work[R];
    for (int i = 0; i < R; i++) work[i] = avail[i];
    for (int i = 0; i < P; i++)
        for (int j = 0; j < R; j++)
            need[i][j] = max[i][j] - allot[i][j];

    int count = 0;
    while (count < P) {
        int found = 0;
        for (int p = 0; p < P; p++) {
            if (finish[p] == 0) {
                int j;
                for (j = 0; j < R; j++)
                    if (need[p][j] > work[j]) break;
                if (j == R) {
                    for (int k = 0; k < R; k++) work[k] += allot[p][k];
                    safeSeq[count++] = p;
                    finish[p] = 1;
                    found = 1;
                }
            }
        }
        if (found == 0) return 0; // Unsafe state
    }
    return 1; // Safe state
}`,
              explanation: "Banker's algorithm checks whether the system is in a safe state and calculates the safe execution sequence."
            },
            importantQuestions: [
              {
                question: "State the 4 necessary conditions for deadlock. How can deadlock be prevented by negating each condition?",
                marks: 10,
                answerSummary: "Explain invalidating Mutual Exclusion (spooling), Hold & Wait (request all resources at start), No Preemption (preempt resources), and Circular Wait (strictly order resources by integer IDs)."
              }
            ],
            vivaQuestions: [
              {
                question: "What is the difference between Deadlock Prevention and Deadlock Avoidance?",
                answer: "Prevention designs rules to ensure at least one Coffman condition can never hold; Avoidance dynamically monitors resource allocation (e.g. Banker's) to stay in safe states."
              }
            ],
            quickRevisionPoints: [
              "4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
              "Banker's Algorithm tests if Need <= Available.",
              "Resource ordering F(r) strictly eliminates Circular Wait."
            ],
            associatedVisualizer: "os"
          }
        }
      },
      {
        unitNumber: 3,
        title: "Process Synchronization & Concurrency",
        hours: 8,
        description: "Race conditions, Critical sections, Peterson's algorithm, Hardware test-and-set, Semaphores (Binary & Counting), Mutex, Monitors, Classical problems: Producer-Consumer, Readers-Writers, Dining Philosophers.",
        topics: {
          "Process Synchronization & Classical Problems": {
            title: "Semaphores, Mutex & Classical Concurrency Problems",
            subtopics: [
              "Critical Section Problem Requirements (Mutual Exclusion, Progress, Bounded Waiting)",
              "Peterson's 2-Process Software Solution",
              "Hardware Synchronization: TestAndSet, CompareAndSwap",
              "Counting and Binary Semaphores (Wait/Signal / P/V)",
              "Producer-Consumer Bounded Buffer Problem",
              "Readers-Writers Problem",
              "Dining Philosophers Problem & Deadlock Solutions"
            ],
            conceptExplanation: `Process Synchronization ensures orderly execution of cooperating concurrent processes to maintain data consistency.

### Synchronization Primitives:
- **Mutex (Mutual Exclusion)**: A locking mechanism where only the thread that locked the mutex can unlock it.
- **Semaphore**: An integer variable accessed only through two atomic operations:
  - \`wait(S)\` / \`P(S)\`: \`while (S <= 0); S--;\`
  - \`signal(S)\` / \`V(S)\`: \`S++;\`
- **Monitors**: High-level language construct encapsulating shared variables and procedures with implicit mutual exclusion.`,
            keyPoints: [
              "Semaphores solve both Mutual Exclusion (Binary Semaphore initialized to 1) and Process Synchronization / Signaling (Counting Semaphore).",
              "The Dining Philosophers problem demonstrates both Deadlock and Starvation when all 5 philosophers grab their left fork simultaneously."
            ],
            realLifeExample: "A single fitting room in a clothing store is a Critical Section protected by a door lock (Mutex).",
            technicalExample: "POSIX \`pthread_mutex_t\` and \`sem_t\` in C multi-threaded programs preventing concurrent corruption of bank balances.",
            diagramAscii: `Producer-Consumer with Bounded Buffer:
Producer -----(Item)-----> [ [1] [2] [ ] [ ] ] -----> Consumer
  sem_wait(&empty)                                      sem_wait(&full)
  pthread_mutex_lock(&mutex)                            pthread_mutex_lock(&mutex)
  // Put in buffer                                      // Take from buffer
  pthread_mutex_unlock(&mutex)                          pthread_mutex_unlock(&mutex)
  sem_post(&full)                                       sem_post(&empty)`,
            formulas: [
              "Wait/P Operation: wait(S) { while (S <= 0); S--; }",
              "Signal/V Operation: signal(S) { S++; }"
            ],
            advantages: ["Prevents memory corruption and non-deterministic race bugs in multi-threaded software."],
            limitations: ["Improper order of wait() calls leads to priority inversions or deadlocks."],
            applications: ["Multi-threaded web servers (Apache, Nginx)", "Database connection pools", "GPU shader parallel processing pipelines"],
            solvedProblem: {
              problemStatement: "In Dining Philosophers, why does having odd philosophers pick left fork first and even pick right fork first eliminate deadlock?",
              stepByStepSolution: [
                "Deadlock occurs because of Circular Wait when all philosophers pick left simultaneously.",
                "Asymmetric picking breaks the circular dependency symmetry.",
                "At least one philosopher will always be able to pick both forks and eat, freeing forks for adjacent neighbors."
              ],
              finalAnswer: "Breaks the Circular Wait condition."
            },
            codeSnippet: {
              language: "c",
              title: "Producer-Consumer Semaphore Solution in C",
              code: `#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>

sem_t empty, full;
pthread_mutex_t mutex;
int buffer[5], in = 0, out = 0;

void* producer(void* arg) {
    int item = 100;
    sem_wait(&empty);
    pthread_mutex_lock(&mutex);
    buffer[in] = item;
    in = (in + 1) % 5;
    pthread_mutex_unlock(&mutex);
    sem_post(&full);
    return NULL;
}`,
              explanation: "Classic POSIX implementation of bounded-buffer producer-consumer."
            },
            importantQuestions: [
              {
                question: "Explain the Readers-Writers problem and provide a semaphore-based solution that prioritizes readers.",
                marks: 10,
                answerSummary: "Use mutex and wrt semaphores, maintain read_count variable to ensure first reader locks wrt and last reader unlocks wrt."
              }
            ],
            vivaQuestions: [
              {
                question: "What is the difference between a Mutex and a Binary Semaphore?",
                answer: "A Mutex has ownership semantics (only the thread that locked it can unlock it); a Semaphore can be signaled by any thread (used for task synchronization)."
              }
            ],
            quickRevisionPoints: [
              "Critical section requires: Mutual Exclusion, Progress, Bounded Waiting.",
              "Peterson's algorithm uses flag[2] and turn variable.",
              "Binary semaphore initialized to 1 acts as a lock."
            ],
            associatedVisualizer: "os"
          }
        }
      },
      {
        unitNumber: 4,
        title: "Memory Management & Virtual Memory",
        hours: 8,
        description: "Logical vs Physical Address Space, Contiguous Allocation, Fragmentation, Paging, Page Table Structure, Segmentation, Virtual Memory, Demand Paging, Page Replacement (FIFO, LRU, Optimal), Thrashing.",
        topics: {
          "Paging, Virtual Memory & Page Replacement": {
            title: "Paging, Translation Lookaside Buffer (TLB) & Page Replacement Algorithms",
            subtopics: [
              "Logical vs Physical Address Translation (MMU)",
              "Internal vs External Fragmentation",
              "Paging Architecture, Page Size & Frame Allocation",
              "Translation Lookaside Buffer (TLB) & Effective Access Time",
              "Virtual Memory & Demand Paging",
              "Page Replacement: FIFO (Belady's Anomaly), LRU, Optimal",
              "Thrashing & Working Set Model"
            ],
            conceptExplanation: `**Paging** is a memory management scheme that eliminates external fragmentation by dividing physical memory into fixed-size **Frames** and logical memory into same-sized **Pages**.

The **Memory Management Unit (MMU)** translates a logical address $(p, d)$ into physical address $(f, d)$ using the Page Table.
- **TLB (Translation Lookaside Buffer)**: High-speed hardware cache holding recently accessed page table entries.
- **Page Fault**: Occurs when a referenced page is not currently resident in physical RAM.

### Page Replacement Algorithms:
1. **FIFO**: Replaces oldest page (can suffer from Belady's Anomaly where more frames yield more page faults).
2. **Optimal**: Replaces page that will not be used for the longest future duration (theoretical benchmark).
3. **LRU (Least Recently Used)**: Replaces page that has not been used for longest past duration (approximates Optimal).`,
            keyPoints: [
              "Effective Access Time (EAT) $= h \\cdot (t_{\\text{TLB}} + t_{\\text{mem}}) + (1 - h) \\cdot (t_{\\text{TLB}} + 2 \\cdot t_{\\text{mem}})$.",
              "Thrashing occurs when a computer's virtual memory subsystem is constantly in a state of paging, spending more time swapping than executing instructions."
            ],
            realLifeExample: "Keeping your most active study books on your desk (RAM) while storing the rest on library bookshelves (Hard Disk/Swap).",
            technicalExample: "x86_64 architecture uses 4-level paging (PML4, PDPT, PD, PT) with 4KB base pages and hardware TLBs.",
            diagramAscii: `Logical Address Translation via Page Table:
Logical Address: [Page p | Offset d]
                     |         |
                     v         |
          Page Table [p -> f]  |
                     |         |
                     v         v
Physical Address: [Frame f | Offset d] ---> Physical RAM`,
            formulas: [
              "Physical Address = (Frame Number * Page Size) + Offset",
              "Effective Access Time: EAT = h * (t_tlb + t_mem) + (1 - h) * (t_tlb + 2*t_mem)"
            ],
            advantages: ["Allows programs larger than physical RAM to execute seamlessly.", "Eliminates external fragmentation completely."],
            limitations: ["Suffers from internal fragmentation (on average half a page per process)."],
            applications: ["Modern OS virtual memory address isolation", "Copy-on-write process creation", "Memory-mapped files"],
            solvedProblem: {
              problemStatement: "Given page reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3 with 3 frames. Calculate page faults for FIFO.",
              stepByStepSolution: [
                "7 -> [7, -, -] (Fault 1)",
                "0 -> [7, 0, -] (Fault 2)",
                "1 -> [7, 0, 1] (Fault 3)",
                "2 -> [2, 0, 1] (Fault 4, replaces 7)",
                "0 -> Hit",
                "3 -> [2, 3, 1] (Fault 5, replaces 0)",
                "0 -> [2, 3, 0] (Fault 6, replaces 1)",
                "4 -> [4, 3, 0] (Fault 7, replaces 2)",
                "2 -> [4, 2, 0] (Fault 8, replaces 3)",
                "3 -> [4, 2, 3] (Fault 9, replaces 0)"
              ],
              finalAnswer: "Total Page Faults = 9"
            },
            codeSnippet: {
              language: "c",
              title: "LRU Page Replacement Algorithm in C",
              code: `#include <stdio.h>

int findLRU(int time[], int n) {
    int minimum = time[0], pos = 0;
    for (int i = 1; i < n; ++i) {
        if (time[i] < minimum) {
            minimum = time[i];
            pos = i;
        }
    }
    return pos;
}`,
              explanation: "Helper function for Least Recently Used (LRU) frame replacement using timestamp counters."
            },
            importantQuestions: [
              {
                question: "Compare FIFO, LRU, and Optimal page replacement algorithms with reference string 1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5 for 3 frames.",
                marks: 10,
                answerSummary: "Full step-by-step trace showing page hits, misses, and fault counts for each algorithm."
              }
            ],
            vivaQuestions: [
              {
                question: "What is Belady's Anomaly?",
                answer: "The phenomenon where increasing the number of page frames results in an increased number of page faults for certain page reference strings in the FIFO algorithm."
              }
            ],
            quickRevisionPoints: [
              "Paging eliminates external fragmentation; suffers from internal fragmentation.",
              "LRU replaces the page unused for the longest past time.",
              "Thrashing is prevented by the Working Set Model."
            ],
            associatedVisualizer: "os"
          }
        }
      },
      {
        unitNumber: 5,
        title: "File Systems, Storage & Disk Scheduling",
        hours: 8,
        description: "File concept, Directory structures, Allocation methods (Contiguous, Linked, Indexed), Disk scheduling (FCFS, SSTF, SCAN, C-SCAN, LOOK), RAID levels.",
        topics: {
          "Disk Scheduling Algorithms & RAID Levels": {
            title: "Disk Scheduling: FCFS, SSTF, SCAN, C-SCAN & RAID Levels",
            subtopics: [
              "Magnetic Disk Structure: Cylinders, Tracks, Sectors, Seek Time, Rotational Latency",
              "Disk Scheduling Algorithms: FCFS, SSTF, SCAN (Elevator), C-SCAN, LOOK, C-LOOK",
              "File Allocation Methods: Contiguous, Chained/Linked, Inode/Indexed",
              "RAID Architecture: RAID 0 (Striping), RAID 1 (Mirroring), RAID 5 (Parity), RAID 10"
            ],
            conceptExplanation: `**Disk Scheduling** determines the order in which disk I/O read/write requests are serviced to minimize total **Seek Time** (head movement across cylinders).

### Scheduling Algorithms:
1. **FCFS**: Services requests in arrival order.
2. **SSTF (Shortest Seek Time First)**: Selects request closest to current head position (can cause starvation for distant requests).
3. **SCAN (Elevator)**: Head moves in one direction servicing requests until the end, then reverses direction.
4. **C-SCAN (Circular SCAN)**: Head moves in one direction to the end, then returns directly to the beginning without servicing requests on return.

### RAID (Redundant Array of Independent Disks):
- **RAID 0**: Striping without redundancy (High speed, zero fault tolerance).
- **RAID 1**: Mirroring (100% redundancy, 50% capacity loss).
- **RAID 5**: Block-level striping with distributed parity (Tolerates 1 disk failure, high storage efficiency).`,
            keyPoints: [
              "Seek time dominates disk access latency over rotational latency and transfer time.",
              "Unix inodes use multi-level indexed allocation (Direct blocks, Single indirect, Double indirect, Triple indirect)."
            ],
            realLifeExample: "An office elevator moving from ground to top floor picking up passengers along its path behaves like the SCAN disk algorithm.",
            technicalExample: "Enterprise NAS storage arrays using RAID 5 and NVMe ZNS (Zoned Namespaces) for sustained high IOPS.",
            diagramAscii: `SCAN vs C-SCAN Disk Head Traversal:
SCAN:   [0] <===== Head =====> [199] (Bounces back and forth)
C-SCAN: [0] =====> Head =====> [199] ---> Jumps back to [0]`,
            formulas: ["Total Head Movement = Sum(|Track_{i} - Track_{i-1}|)"],
            advantages: ["SCAN eliminates SSTF starvation while preserving low seek times.", "RAID 5 provides fault tolerance with minimal parity storage overhead."],
            limitations: ["HDD mechanical seek latency is thousands of times slower than RAM."],
            applications: ["Database transaction log writes", "Cloud storage SAN/NAS pools", "Operating system boot disk management"],
            solvedProblem: {
              problemStatement: "Disk queue: [98, 183, 37, 122, 14, 124, 65, 67]. Head starts at 53. Calculate total head movement using FCFS.",
              stepByStepSolution: [
                "Path: 53 -> 98 -> 183 -> 37 -> 122 -> 14 -> 124 -> 65 -> 67.",
                "|98-53| + |183-98| + |37-183| + |122-37| + |14-122| + |124-14| + |65-124| + |67-65|",
                "= 45 + 85 + 146 + 85 + 108 + 110 + 59 + 2 = 640 cylinders."
              ],
              finalAnswer: "Total Head Movement = 640 cylinders."
            },
            codeSnippet: {
              language: "c",
              title: "SSTF Disk Scheduling in C",
              code: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int findClosest(int req[], int visited[], int n, int head) {
    int min = 99999, idx = -1;
    for (int i = 0; i < n; i++) {
        if (!visited[i] && abs(req[i] - head) < min) {
            min = abs(req[i] - head);
            idx = i;
        }
    }
    return idx;
}`,
              explanation: "Selects the closest pending disk cylinder request to minimize immediate seek distance."
            },
            importantQuestions: [
              {
                question: "Compare RAID 0, RAID 1, RAID 5, and RAID 6 in terms of redundancy, read/write performance, and storage efficiency.",
                marks: 10,
                answerSummary: "Detailed comparative table of data striping, mirror redundancy, distributed parity, and disk failure tolerance."
              }
            ],
            vivaQuestions: [
              {
                question: "What is an Inode in Linux?",
                answer: "A data structure on a filesystem that stores all metadata about a file (size, permissions, owner, timestamps, block pointers) except its name and actual file data."
              }
            ],
            quickRevisionPoints: [
              "SSTF chooses request with minimum seek distance.",
              "SCAN moves in one direction to the end then reverses.",
              "RAID 5 can survive single disk failure using parity XOR."
            ],
            associatedVisualizer: "os"
          }
        }
      }
    ]
  },

  // ==========================================
  // YEAR 3 - SEMESTER 5: DATABASE MANAGEMENT SYSTEMS (BCS5016 / UCS5012)
  // ==========================================
  UCS5012: {
    code: "UCS5012",
    title: "Database Management System",
    semester: 5,
    year: 3,
    credits: 4.0,
    scheme: { L: 3, T: 1, P: 0, CIE: 40, ESE: 60, Total: 100 },
    isElective: false,
    isLab: false,
    department: "CSE",
    iconName: "Database",
    defaultVisualizer: "dbms",
    description: "Relational database modeling, ER diagrams, Relational Algebra, SQL/PL-SQL, Normalization (1NF to BCNF), ACID transactions, and Concurrency control.",
    textbooks: [
      "Korth, Silberschatz, Sudarshan, 'Database System Concepts', McGraw-Hill.",
      "Elmasri, Navathe, 'Fundamentals of Database Systems', Pearson Education."
    ],
    referenceBooks: [
      "Date C.J., 'An Introduction to Database Systems', Addison-Wesley.",
      "Raghu Ramakrishnan, Johannes Gehrke, 'Database Management Systems', McGraw-Hill."
    ],
    units: [
      {
        unitNumber: 1,
        title: "Database Architecture & Entity-Relationship (ER) Modeling",
        hours: 8,
        description: "DBMS vs File System, 3-Schema Architecture, Data Independence, ER Model concepts, Cardinality, Super/Candidate/Primary keys, Generalization, Aggregation, Reduction of ER to Relational Tables.",
        topics: {
          "ER Modeling, Keys & Schema Architecture": {
            title: "3-Schema Architecture, Keys & ER-to-Relational Mapping",
            subtopics: [
              "DBMS vs File Processing System",
              "Three-Schema Architecture (Physical, Conceptual, External)",
              "Physical & Logical Data Independence",
              "Entity Sets, Weak Entities, Attributes (Composite, Multi-valued, Derived)",
              "Keys: Super Key, Candidate Key, Primary Key, Alternate Key, Foreign Key",
              "ER to Relational Schema Reduction Rules"
            ],
            conceptExplanation: `A **Database Management System (DBMS)** provides centralized data definition, manipulation, query processing, and transactional recovery.

### 3-Schema Architecture (ANSI/SPARC):
1. **Physical Level**: Describes how data is physically stored on magnetic/SSD blocks.
2. **Conceptual Level**: Describes what data is stored and relationships among data (Relational schemas).
3. **External Level**: Tailored views visible to end users.

### Key Classification:
- **Super Key**: Set of one or more attributes that uniquely identify a tuple.
- **Candidate Key**: Minimal super key with no redundant attributes.
- **Primary Key**: The chosen candidate key selected by the database designer.
- **Foreign Key**: Attribute in a referencing relation that refers to the Primary Key of a referenced relation.`,
            keyPoints: [
              "Logical Data Independence protects external schemas from changes in conceptual schema.",
              "Weak entity sets do not have a primary key of their own and require an identifying owner entity set connected via identifying relationship."
            ],
            realLifeExample: "A university ERP where students see their grade view, professors see attendance grading views, while IT administrators manage disk indexes.",
            technicalExample: "Foreign Key constraints enforce referential integrity between \`Enrollments(student_id)\` and \`Students(id)\`.",
            diagramAscii: `ER-to-Relational Mapping:
[ Student ] ====== (EnrollsIn) =====< [ Course ]
  - id (PK)                                - code (PK)
  - name                                   - credits

Tables Generated:
1. Students(id [PK], name)
2. Courses(code [PK], credits)
3. EnrollsIn(student_id [FK], course_code [FK], PRIMARY KEY (student_id, course_code))`,
            formulas: ["Candidate Key: K is minimal if for all proper subsets S subset K, S does not uniquely identify tuples."],
            advantages: ["Eliminates data redundancy and inconsistencies.", "Guarantees concurrent ACID transaction isolation."],
            limitations: ["Requires database server hardware and relational schema design overhead."],
            applications: ["Banking transactions", "Airline reservations", "E-commerce customer order catalogs"],
            solvedProblem: {
              problemStatement: "Given relation R(A, B, C, D) with FDs: A->B, B->C, C->D. Find all Candidate Keys.",
              stepByStepSolution: [
                "Find attribute closure of A: A+ = {A, B, C, D}. A determines all attributes.",
                "Since A does not appear on any RHS, A must be present in every candidate key.",
                "Since A+ contains all attributes and A is single attribute, A is the unique Candidate Key."
              ],
              finalAnswer: "Candidate Key = {A}"
            },
            codeSnippet: {
              language: "sql",
              title: "SQL Table Creation with Foreign Key Constraints",
              code: `CREATE TABLE Departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cgpa DECIMAL(3, 2) CHECK (cgpa >= 0.0 AND cgpa <= 10.0),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id) ON DELETE CASCADE
);`,
              explanation: "SQL DDL statement enforcing Primary Key, Check constraint, and ON DELETE CASCADE Foreign Key."
            },
            importantQuestions: [
              {
                question: "Explain the 3-Schema Architecture with a neat diagram. How does it achieve physical and logical data independence?",
                marks: 10,
                answerSummary: "Describe External, Conceptual, and Internal levels, explaining how modifying lower schemas leaves upper schemas intact."
              }
            ],
            vivaQuestions: [
              {
                question: "What is the difference between a Primary Key and a Unique Key?",
                answer: "A Primary Key cannot accept NULL values and a table can have only one; a Unique Key column allows one or more NULL values and a table can have multiple unique constraints."
              }
            ],
            quickRevisionPoints: [
              "3 levels: External (Views), Conceptual (Logical), Internal (Physical).",
              "Weak entity has a discriminator/partial key and total participation.",
              "Candidate Key = Minimal Super Key."
            ],
            associatedVisualizer: "dbms"
          }
        }
      },
      {
        unitNumber: 2,
        title: "Relational Data Model, Relational Algebra & SQL",
        hours: 8,
        description: "Relational Algebra operations (Select, Project, Join, Union, Difference, Cartesian Product), Tuple and Domain Relational Calculus, SQL DDL, DML, DCL, Joins, Subqueries, Views, Triggers, PL/SQL.",
        topics: {
          "Relational Algebra & Advanced SQL Queries": {
            title: "Relational Algebra Operators, SQL Joins & Subqueries",
            subtopics: [
              "Relational Algebra Operators: Select (sigma), Project (pi), Union (cup), Set Difference (-), Cartesian Product (x)",
              "Join Operations: Natural Join, Theta Join, Outer Joins (Left, Right, Full)",
              "SQL Aggregations: COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING",
              "Subqueries: Correlated vs Non-correlated Subqueries",
              "PL/SQL Stored Procedures, Cursors & Triggers"
            ],
            conceptExplanation: `**Relational Algebra** is a formal procedural query language where operations take relations as input and produce a new relation as output.

### Fundamental Relational Algebra Operations:
1. **Selection ($\\sigma_p(R)$)**: Filters tuples satisfying predicate $p$.
2. **Projection ($\\pi_{A_1, \\dots, A_k}(R)$)**: Extracts specified column attributes.
3. **Natural Join ($R \\bowtie S$)**: Matches tuples on common attribute names.
4. **Division ($R \\div S$)**: Useful for 'for all' relational queries.

**SQL** translates relational algebra operations into declarative syntax optimized by the database cost-based engine.`,
            keyPoints: [
              "WHERE filters individual rows before grouping; HAVING filters grouped aggregated records.",
              "Left Outer Join returns all rows from left table plus matching rows from right table (NULL if no match)."
            ],
            realLifeExample: "Generating a university Dean's List query selecting all students whose GPA $> 3.8$ in Computer Science.",
            technicalExample: "Running \`SELECT dept_name, AVG(salary) FROM Instructors GROUP BY dept_name HAVING AVG(salary) > 80000;\`.",
            diagramAscii: `SQL Joins Visual Venn:
    [Table A]               [Table B]
  ( Left Only  ( INNER JOIN )  Right Only )
  \\______________________________________/
                FULL OUTER JOIN`,
            formulas: [
              "Selection: sigma_{salary > 50000}(Employee)",
              "Projection: pi_{name, dept}(Employee)",
              "Natural Join: R \\bowtie S = pi_{schema}(sigma_{R.id = S.id}(R x S))"
            ],
            advantages: ["Declarative SQL abstracts underlying disk storage and query execution planning."],
            limitations: ["Complex nested correlated subqueries can suffer from $O(n^2)$ full table scans if unindexed."],
            applications: ["Business Intelligence dashboards", "Customer billing reports", "Web authentication checks"],
            solvedProblem: {
              problemStatement: "Write a SQL query to find the 2nd highest salary from an Employee table without using LIMIT/TOP.",
              stepByStepSolution: [
                "Find the maximum salary first: SELECT MAX(salary) FROM Employee.",
                "Select the maximum salary that is strictly less than the overall maximum: SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee)."
              ],
              finalAnswer: "SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);"
            },
            codeSnippet: {
              language: "sql",
              title: "Complex SQL Join and Aggregation Query",
              code: `-- Find departments with more than 5 students and average CGPA > 8.0
SELECT 
    d.dept_name,
    COUNT(s.student_id) AS total_students,
    ROUND(AVG(s.cgpa), 2) AS avg_cgpa
FROM Departments d
INNER JOIN Students s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
HAVING COUNT(s.student_id) >= 5 AND AVG(s.cgpa) > 8.0
ORDER BY avg_cgpa DESC;`,
              explanation: "Demonstrates INNER JOIN, GROUP BY, aggregate functions, HAVING filtering, and ORDER BY sorting."
            },
            importantQuestions: [
              {
                question: "Explain the differences between Relational Algebra and Relational Calculus. Write relational algebra queries for Union, Intersection, and Division.",
                marks: 10,
                answerSummary: "Relational Algebra is procedural; Relational Calculus is declarative (TRC and DRC). Detail operators with mathematical expressions."
              }
            ],
            vivaQuestions: [
              {
                question: "What is the difference between WHERE and HAVING clause in SQL?",
                answer: "WHERE filters rows before grouping occurs and cannot use aggregate functions; HAVING filters groups after GROUP BY and evaluates aggregate conditions."
              }
            ],
            quickRevisionPoints: [
              "Relational Algebra is procedural; SQL is declarative.",
              "HAVING is used with GROUP BY for aggregate predicates.",
              "Outer Joins preserve non-matching tuples with NULL padding."
            ],
            associatedVisualizer: "dbms"
          }
        }
      },
      {
        unitNumber: 3,
        title: "Relational Database Design & Normalization",
        hours: 8,
        description: "Functional dependencies (FD), Closure of FDs and attributes, Normal forms (1NF, 2NF, 3NF, BCNF), Lossless join decomposition, Dependency preservation, Multi-valued dependencies (4NF).",
        topics: {
          "Database Normalization (1NF, 2NF, 3NF, BCNF)": {
            title: "Functional Dependencies & Normalization: 1NF, 2NF, 3NF & BCNF",
            subtopics: [
              "Anomalies in Unnormalized Tables: Insertion, Deletion, Update",
              "Functional Dependency (FD) & Armstrong's Axioms",
              "Attribute Closure Algorithm & Finding Candidate Keys",
              "1NF: Atomic Values, No Repeating Groups",
              "2NF: In 1NF + No Partial Dependency (Every Non-Prime depends on whole Candidate Key)",
              "3NF: In 2NF + No Transitive Dependency (X -> A where X is Super Key or A is Prime)",
              "BCNF (Boyce-Codd Normal Form): For every X -> A, X must be a Super Key",
              "Lossless-Join & Dependency-Preserving Decompositions"
            ],
            conceptExplanation: `**Normalization** is the systematic process of organizing relational database attributes and tables to minimize redundancy and prevent insertion, deletion, and update anomalies.

### Normal Forms Hierarchy:
1. **1NF**: All attribute values are atomic (no arrays or comma-separated lists).
2. **2NF**: Table is in 1NF and contains no **Partial Dependencies** (no non-prime attribute depends on a proper subset of a composite candidate key).
3. **3NF**: Table is in 2NF and contains no **Transitive Dependencies** (for all $X \\to A$, either $X$ is a super key or $A$ is a prime attribute).
4. **BCNF**: Stricter version of 3NF where for every functional dependency $X \\to A$, $X$ must strictly be a **Super Key**.`,
            keyPoints: [
              "Prime Attribute: Attribute that is a member of any candidate key.",
              "3NF decomposition is always guaranteed to be both Lossless Join and Dependency Preserving.",
              "BCNF decomposition guarantees Lossless Join, but may not always preserve all functional dependencies."
            ],
            realLifeExample: "Storing student addresses and course grades in a single table means deleting a student's last course enrollment accidentally deletes their address record (Deletion Anomaly).",
            technicalExample: "Decomposing \`R(StudentID, CourseID, Instructor, Room)\` with FDs \`{StudentID, CourseID} -> Grade\` and \`CourseID -> {Instructor, Room}\` into 2 separate 2NF/3NF relations.",
            diagramAscii: `Normalization Hierarchy:
+---------------------------------------+
|  BCNF (Every determinant is superkey) |
|   +---------------------------------+ |
|   | 3NF (No transitive dependency)  | |
|   |   +---------------------------+ | |
|   |   | 2NF (No partial dependency| | |
|   |   |   +---------------------+ | | |
|   |   |   | 1NF (Atomic Values) | | | |
|   |   |   +---------------------+ | | |
|   |   +---------------------------+ | |
|   +---------------------------------+ |
+---------------------------------------+`,
            formulas: [
              "Armstrong's Reflexivity: If Y subset of X, then X -> Y",
              "Armstrong's Augmentation: If X -> Y, then XZ -> YZ",
              "Armstrong's Transitivity: If X -> Y and Y -> Z, then X -> Z"
            ],
            advantages: ["Prevents data duplication, reducing disk space and indexing costs.", "Ensures consistent updates across all application modules."],
            limitations: ["Over-normalization requires excessive table JOIN operations, decreasing read throughput."],
            applications: ["Enterprise relational database architecture", "OLTP banking transaction systems", "E-commerce order billing schemas"],
            solvedProblem: {
              problemStatement: "Given R(A, B, C, D, E) with FDs: AB -> C, C -> D, D -> E. Find the highest normal form of R.",
              stepByStepSolution: [
                "Candidate Key: (AB)+ = {A, B, C, D, E} -> Candidate Key is {AB}.",
                "Prime attributes = {A, B}; Non-prime = {C, D, E}.",
                "Check 1NF: Yes, attributes are atomic.",
                "Check 2NF: No partial dependencies on proper subset of AB -> Yes, in 2NF.",
                "Check 3NF: In C -> D, C is not a super key and D is not prime -> Violates 3NF due to Transitive Dependency."
              ],
              finalAnswer: "Highest Normal Form of R is 2NF."
            },
            codeSnippet: {
              language: "sql",
              title: "Normalized 3NF Schema Decomposition",
              code: `-- Original Anomaly Table R(StudentID, CourseID, InstructorName, Department)
-- Decomposed into 3NF:

CREATE TABLE Courses (
    course_id VARCHAR(10) PRIMARY KEY,
    instructor_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL
);

CREATE TABLE StudentEnrollments (
    student_id INT,
    course_id VARCHAR(10),
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);`,
              explanation: "Eliminates transitive dependencies by separating Course metadata from enrollment records."
            },
            importantQuestions: [
              {
                question: "Define BCNF. How does it differ from 3NF? Prove whether every BCNF relation is in 3NF.",
                marks: 10,
                answerSummary: "BCNF requires X to be a super key for all X->A. In 3NF, A can alternatively be a prime attribute. Since BCNF lacks this exception, all BCNF relations are automatically in 3NF."
              }
            ],
            vivaQuestions: [
              {
                question: "What is a Partial Functional Dependency?",
                answer: "A functional dependency where a non-prime attribute depends on only a proper subset of a composite candidate key rather than the entire composite key."
              }
            ],
            quickRevisionPoints: [
              "1NF: Atomic values.",
              "2NF: 1NF + No partial dependencies.",
              "3NF: 2NF + No transitive dependencies.",
              "BCNF: For all X->Y, X must be a super key."
            ],
            associatedVisualizer: "dbms"
          }
        }
      },
      {
        unitNumber: 4,
        title: "Transaction Processing, ACID & Concurrency Control",
        hours: 8,
        description: "Transaction concepts, ACID properties, Serializability (Conflict & View), Recoverability, Lock-based protocols (2PL, Strict 2PL), Timestamp ordering, Deadlocks.",
        topics: {
          "Transactions, ACID Properties & 2-Phase Locking": {
            title: "ACID Properties, Conflict Serializability & 2-Phase Locking (2PL)",
            subtopics: [
              "Transaction Concept & States: Active, Partially Committed, Committed, Failed, Aborted",
              "ACID Properties: Atomicity, Consistency, Isolation, Durability",
              "Schedules: Serial, Concurrent, Conflict Serializable",
              "Conflict Operations: Read-Write, Write-Read, Write-Write on Same Item",
              "Precedence Graph (Serialization Graph) Testing",
              "Two-Phase Locking Protocol (2PL, Strict 2PL, Rigorous 2PL)",
              "Timestamp Ordering Protocol & Write-Ahead Logging (WAL)"
            ],
            conceptExplanation: `A **Transaction** is a logical unit of database processing that includes one or more database access operations.

### ACID Properties:
- **Atomicity**: 'All or nothing' execution managed by Recovery Manager (undo logs).
- **Consistency**: Preserves database integrity constraints before and after execution.
- **Isolation**: Concurrent transactions execute without interfering with one another (managed by Concurrency Control).
- **Durability**: Committed updates persist permanently on disk even during power failures.

### Two-Phase Locking (2PL):
1. **Growing Phase**: Transaction may acquire locks, but release none.
2. **Shrinking Phase**: Transaction may release locks, but acquire no new ones.
*Strict 2PL* holds all exclusive locks until commit, preventing cascading aborts.`,
            keyPoints: [
              "Conflict Serializability: A schedule $S$ is conflict serializable if its precedence graph contains no directed cycles.",
              "Cascadeless schedule: A transaction reads values only written by committed transactions."
            ],
            realLifeExample: "Transferring $500 from Account A to Account B: Debiting A and crediting B must both succeed or both be aborted (Atomicity).",
            technicalExample: "PostgreSQL and MySQL InnoDB use Multi-Version Concurrency Control (MVCC) with WAL (Write-Ahead Logging) for high-performance non-blocking reads.",
            diagramAscii: `Two-Phase Locking (2PL) Lock Phases:
Lock Count
    ^         /\\ (Lock Point)
    |        /  \\
    |       /    \\
    |      /      \\
    |  Growing   Shrinking
    |  Phase      Phase
    +------------------------> Time`,
            formulas: [
              "Conflict Condition: Op1 in T1, Op2 in T2 on item X where at least one Op is Write.",
              "Precedence Graph: Edge T1 -> T2 if T1 performs conflicting operation before T2."
            ],
            advantages: ["Guarantees strict serializable transaction correctness.", "Strict 2PL prevents cascading rollbacks."],
            limitations: ["Standard 2PL can still suffer from deadlocks requiring timeout or graph cycle aborts."],
            applications: ["Online banking wire transfers", "Stock market exchange matching engines", "Flight ticket reservation systems"],
            solvedProblem: {
              problemStatement: "Test if schedule S: r1(X), r2(Y), w1(X), r2(X), w2(Y) is conflict serializable.",
              stepByStepSolution: [
                "Conflicting pairs: w1(X) before r2(X) -> Draw edge T1 -> T2.",
                "Check for other conflicting pairs on Y or X between T2 and T1: None.",
                "Precedence Graph has single edge T1 -> T2 with NO cycles."
              ],
              finalAnswer: "Schedule S is Conflict Serializable with equivalent serial order <T1, T2>."
            },
            codeSnippet: {
              language: "sql",
              title: "ACID Transaction with Rollback in SQL",
              code: `BEGIN TRANSACTION;

UPDATE Accounts SET balance = balance - 500.00 WHERE account_id = 101;
UPDATE Accounts SET balance = balance + 500.00 WHERE account_id = 202;

-- Check constraint validation
IF (SELECT balance FROM Accounts WHERE account_id = 101) < 0
BEGIN
    PRINT 'Insufficient Funds - Rolling Back Transaction!';
    ROLLBACK TRANSACTION;
END
ELSE
BEGIN
    COMMIT TRANSACTION;
    PRINT 'Transfer Completed Successfully.';
END`,
              explanation: "Demonstrates atomic transaction block guaranteeing consistency with conditional rollback."
            },
            importantQuestions: [
              {
                question: "Explain the ACID properties with banking examples. Describe how DBMS recovery subsystem guarantees Atomicity and Durability.",
                marks: 10,
                answerSummary: "Detail Atomicity (WAL logs), Consistency (constraints), Isolation (2PL/MVCC), and Durability (checkpoints and flushing)."
              }
            ],
            vivaQuestions: [
              {
                question: "What is the difference between Conflict Serializability and View Serializability?",
                answer: "Conflict serializability is a subset of view serializability tested easily in O(V+E) with precedence graphs; View serializability is NP-complete to test."
              }
            ],
            quickRevisionPoints: [
              "ACID = Atomicity, Consistency, Isolation, Durability.",
              "Conflict serializable if precedence graph has no cycles.",
              "Strict 2PL holds exclusive locks until transaction commit."
            ],
            associatedVisualizer: "dbms"
          }
        }
      }
    ]
  },

  // ==========================================
  // YEAR 3 - SEMESTER 6: COMPUTER NETWORKS (BCS6001 / UCS6007)
  // ==========================================
  UCS6007: {
    code: "UCS6007",
    title: "Computer Networks",
    semester: 6,
    year: 3,
    credits: 4.0,
    scheme: { L: 3, T: 1, P: 0, CIE: 40, ESE: 60, Total: 100 },
    isElective: false,
    isLab: false,
    department: "CSE",
    iconName: "Globe",
    defaultVisualizer: "network",
    description: "OSI and TCP/IP layered architectures, Physical layer encoding, Data link flow/error control, IPv4/IPv6 routing, TCP/UDP transport protocols, and DNS/HTTP.",
    textbooks: [
      "Andrew S. Tanenbaum, 'Computer Networks', 4th Edition, Pearson.",
      "Behrouz A. Forouzan, 'Data Communications and Networking', 4th Edition, McGraw-Hill."
    ],
    referenceBooks: [
      "James F. Kurose, Keith W. Ross, 'Computer Networking: A Top-Down Approach', Pearson.",
      "Larry L. Peterson, Bruce S. Davie, 'Computer Networks: A Systems Approach'."
    ],
    units: [
      {
        unitNumber: 1,
        title: "Introduction, Reference Models & Physical Layer",
        hours: 8,
        description: "Network topologies (Bus, Star, Ring, Mesh), OSI 7-layer model, TCP/IP protocol suite, Transmission media (Twisted pair, Coaxial, Fiber optic), Multiplexing (FDM, TDM, WDM), Switching (Circuit vs Packet).",
        topics: {
          "OSI 7-Layer vs TCP/IP Architecture": {
            title: "OSI 7-Layer Model vs TCP/IP Protocol Stack",
            subtopics: [
              "Concept of Protocol Layering & Encapsulation",
              "OSI 7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application",
              "TCP/IP 4/5 Layer Architecture",
              "Physical Topologies: Star, Mesh, Bus, Ring, Hybrid",
              "Circuit Switching vs Packet Switching (Virtual Circuit vs Datagram)"
            ],
            conceptExplanation: `Network communications rely on layered abstractions where each layer provides standardized services to the layer above while hiding implementation details.

### OSI 7-Layer Model:
1. **Application (Layer 7)**: User interface & network services (HTTP, DNS, SMTP).
2. **Presentation (Layer 6)**: Data encryption, compression, and ASCII/EBCDIC translation.
3. **Session (Layer 5)**: Dialog control, token management, and checkpointing.
4. **Transport (Layer 4)**: End-to-end reliable transmission, segmenting, port addressing (TCP, UDP).
5. **Network (Layer 3)**: Logical routing and IP packet addressing (IPv4, IPv6, ICMP).
6. **Data Link (Layer 2)**: Hop-to-hop frame delivery, MAC addressing, error detection (Ethernet, Wi-Fi).
7. **Physical (Layer 1)**: Transmission of raw bit streams over physical media.`,
            keyPoints: [
              "Data Encapsulation: Headers (and trailers) are appended at each descending layer (Data -> Segment -> Packet -> Frame -> Bits).",
              "Routers operate up to Layer 3; Layer-2 Switches operate at Layer 2; Hubs operate at Layer 1."
            ],
            realLifeExample: "Sending a postal letter: You write the message (Application), put it in an envelope (Presentation/Session), write the recipient name (Transport), write street/postal address (Network), give it to mail carrier (Data Link), who transports it on the road (Physical).",
            technicalExample: "When you browse \`https://google.com\`, the browser generates an HTTP GET request encapsulated into a TCP segment (port 443), an IPv4 packet, and an Ethernet II frame (802.3).",
            diagramAscii: `OSI vs TCP/IP Mapping:
OSI 7 LAYERS               TCP/IP 4 LAYERS
[7] Application      \\
[6] Presentation      }---> [4] Application (HTTP, DNS, SMTP)
[5] Session          /
[4] Transport ------------> [3] Transport (TCP, UDP)
[3] Network --------------> [2] Internet (IP, ICMP, ARP)
[2] Data Link        \\
[1] Physical          }---> [1] Network Access (Ethernet, Wi-Fi)`,
            formulas: [
              "Transmission Delay: T_trans = L / R (Packet length / Bandwidth)",
              "Propagation Delay: T_prop = d / s (Distance / Speed of Light in Medium)"
            ],
            advantages: ["Modularity allows upgrading one protocol layer (e.g. IPv4 to IPv6) without rewriting application software."],
            limitations: ["Layer encapsulation adds protocol header bandwidth overhead."],
            applications: ["Global Internet infrastructure", "Enterprise LAN / WAN architecture", "Cellular LTE/5G telecommunications"],
            solvedProblem: {
              problemStatement: "A 1000-byte packet is sent over a 1 Mbps link of distance 2000 km. Propagation speed is 2 * 10^8 m/s. Calculate Total Latency (T_trans + T_prop).",
              stepByStepSolution: [
                "Transmission Delay: T_trans = (1000 * 8 bits) / (10^6 bps) = 8000 / 1,000,000 = 8 ms.",
                "Propagation Delay: T_prop = (2000 * 10^3 m) / (2 * 10^8 m/s) = 2,000,000 / 200,000,000 = 10 ms.",
                "Total Latency = 8 ms + 10 ms = 18 ms."
              ],
              finalAnswer: "Total Latency = 18 ms."
            },
            codeSnippet: {
              language: "c",
              title: "Basic Socket Connection in C",
              code: `#include <stdio.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>

int main() {
    int sock = socket(AF_INET, SOCK_STREAM, 0); // IPv4, TCP
    struct sockaddr_in serv_addr;
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(80); // HTTP Port
    inet_pton(AF_INET, "93.184.216.34", &serv_addr.sin_addr); // example.com

    if (connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) < 0) {
        perror("Connection Failed");
        return 1;
    }
    printf("Connected to server successfully on Layer 4 (TCP)!\\n");
    close(sock);
    return 0;
}`,
              explanation: "Creates a BSD socket and establishes a Layer 4 TCP connection to an HTTP server."
            },
            importantQuestions: [
              {
                question: "Explain the OSI Reference Model in detail with functionalities of all 7 layers.",
                marks: 10,
                answerSummary: "Detailed breakdown of all 7 layers from Physical to Application with protocol examples and encapsulation diagrams."
              }
            ],
            vivaQuestions: [
              {
                question: "What layer does a router operate at?",
                answer: "Layer 3 (Network Layer), inspecting IP destination addresses to make forwarding decisions."
              }
            ],
            quickRevisionPoints: [
              "OSI has 7 layers; TCP/IP has 4 layers.",
              "Encapsulation appends headers at each descending layer.",
              "Packet switching is connectionless; circuit switching reserves dedicated physical lines."
            ],
            associatedVisualizer: "network"
          }
        }
      },
      {
        unitNumber: 3,
        title: "Network Layer, IP Addressing & Routing",
        hours: 8,
        description: "IPv4 addressing, Subnetting, CIDR, NAT, IPv6 addressing, Routing algorithms (Distance Vector RIP, Link State OSPF, Path Vector BGP), ARP, ICMP.",
        topics: {
          "IPv4 Subnetting, CIDR & Routing Algorithms": {
            title: "IPv4 Subnetting, Classless Addressing (CIDR) & Routing (Dijkstra/Bellman-Ford)",
            subtopics: [
              "IPv4 Header Format & 32-bit Address Structure",
              "Classful Addressing (Class A, B, C, D, E) vs CIDR",
              "Subnet Masking & Subnet Calculation (Network ID, Broadcast ID, Usable Hosts)",
              "Network Address Translation (NAT)",
              "Distance Vector Routing (Bellman-Ford & Count-to-Infinity problem)",
              "Link State Routing (Dijkstra's Algorithm & OSPF)"
            ],
            conceptExplanation: `The **Network Layer** handles host-to-host packet delivery across heterogeneous internetworks.

### IPv4 Subnetting:
An IPv4 address has 32 bits divided into **Network ID** and **Host ID**.
- CIDR notation $/n$ means the first $n$ bits constitute the network prefix.
- Number of usable hosts per subnet: $2^{32 - n} - 2$ (subtracting Network ID and Directed Broadcast ID).

### Routing Protocols:
1. **Distance Vector (RIP)**: Nodes periodically exchange routing tables with immediate neighbors (calculates min distance via Bellman-Ford).
2. **Link State (OSPF)**: Nodes flood link state advertisements (LSA) so each router builds a complete topological map and runs Dijkstra's algorithm.`,
            keyPoints: [
              "Subnet Mask: All 1s in network portion, all 0s in host portion.",
              "Private IP Ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16."
            ],
            realLifeExample: "Street postal codes categorize letters into neighborhood postal zones, exactly like CIDR network prefixes (/24) route packets to local subnet switches.",
            technicalExample: "A home Wi-Fi router uses NAT (Network Address Translation) to map multiple internal devices (192.168.1.x) to a single public ISP IP.",
            diagramAscii: `IPv4 Subnet Breakdown (/26):
IP: 192.168.1.130 /26
Subnet Mask: 255.255.255.192 (11111111.11111111.11111111.11000000)
Network ID:  192.168.1.128
First Host:  192.168.1.129
Last Host:   192.168.1.190
Broadcast:   192.168.1.191
Total Usable Hosts = 2^6 - 2 = 62 hosts`,
            formulas: [
              "Total Subnet Hosts = 2^(32 - prefix_length)",
              "Usable Hosts = 2^(32 - prefix_length) - 2",
              "Distance Vector Bellman-Ford: D_x(y) = min_v { c(x, v) + D_v(y) }"
            ],
            advantages: ["CIDR and Subnetting prevent rapid IPv4 address exhaustion.", "Link-state routing converges quickly without routing loops."],
            limitations: ["IPv4 32-bit address space is practically exhausted, necessitating migration to 128-bit IPv6."],
            applications: ["Corporate intranet network design", "Internet Service Provider core routing", "Cloud VPC (Virtual Private Cloud) subnet configuration"],
            solvedProblem: {
              problemStatement: "Given IP 200.50.10.0/27, calculate: Subnet Mask, Total Subnets (if borrowing 3 bits from Class C), Usable Hosts per Subnet, and Broadcast Address of first subnet.",
              stepByStepSolution: [
                "Prefix /27 -> Mask has 27 ones: 255.255.255.224.",
                "Host bits = 32 - 27 = 5 bits.",
                "Usable Hosts = 2^5 - 2 = 32 - 2 = 30 hosts.",
                "Subnet block size = 256 - 224 = 32.",
                "First Subnet: Network ID = 200.50.10.0, Usable: 200.50.10.1 to 200.50.10.30, Broadcast = 200.50.10.31."
              ],
              finalAnswer: "Subnet Mask = 255.255.255.224, Usable Hosts = 30, Broadcast = 200.50.10.31."
            },
            codeSnippet: {
              language: "c",
              title: "IP Address and Subnet Mask Bitwise Calculation in C",
              code: `#include <stdio.h>
#include <arpa/inet.h>

void calculateSubnet(const char* ip_str, int prefix) {
    struct in_addr ip, mask, net, bcast;
    inet_pton(AF_INET, ip_str, &ip);

    uint32_t mask_val = prefix == 0 ? 0 : (~0U << (32 - prefix));
    mask.s_addr = htonl(mask_val);
    net.s_addr = ip.s_addr & mask.s_addr;
    bcast.s_addr = net.s_addr | ~mask.s_addr;

    char net_str[INET_ADDRSTRLEN], bcast_str[INET_ADDRSTRLEN];
    inet_ntop(AF_INET, &net, net_str, INET_ADDRSTRLEN);
    inet_ntop(AF_INET, &bcast, bcast_str, INET_ADDRSTRLEN);

    printf("Network ID: %s\\n", net_str);
    printf("Broadcast ID: %s\\n", bcast_str);
}`,
              explanation: "Bitwise calculation of Network ID and Directed Broadcast Address from IP and CIDR prefix."
            },
            importantQuestions: [
              {
                question: "Explain the Distance Vector routing algorithm. What is the Count-to-Infinity problem and how does Split Horizon solve it?",
                marks: 10,
                answerSummary: "Detail Bellman-Ford equation, periodic neighbor updates, slow convergence on link failures (count-to-infinity), and split horizon with poison reverse."
              }
            ],
            vivaQuestions: [
              {
                question: "Why are 2 addresses subtracted when calculating usable hosts per subnet?",
                answer: "One address is reserved for the Network ID (all host bits 0) and one is reserved for the Directed Broadcast Address (all host bits 1)."
              }
            ],
            quickRevisionPoints: [
              "CIDR /24 = 256 IPs, 254 usable hosts.",
              "OSPF uses Dijkstra (Link State); RIP uses Bellman-Ford (Distance Vector).",
              "Private IPs are non-routable over the public Internet."
            ],
            associatedVisualizer: "network"
          }
        }
      },
      {
        unitNumber: 4,
        title: "Transport Layer Protocols (TCP & UDP)",
        hours: 8,
        description: "Process-to-process delivery, UDP header & checksum, TCP segment, TCP 3-Way Handshake, Flow control (Sliding Window), Error control, Congestion Control (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery).",
        topics: {
          "TCP vs UDP & TCP 3-Way Handshake": {
            title: "TCP Connection Management (3-Way Handshake) & Congestion Control",
            subtopics: [
              "Transport Layer Port Addressing & Multiplexing",
              "UDP: Connectionless, Lightweight, Header format, Use Cases",
              "TCP: Connection-Oriented, Reliable Byte-Stream, Segment Format",
              "TCP 3-Way Handshake Connection Establishment & 4-Way Teardown",
              "TCP Flow Control (Sliding Window & Silly Window Syndrome)",
              "TCP Congestion Control: AIMD, Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery"
            ],
            conceptExplanation: `The **Transport Layer** delivers data between specific application processes using **Port Numbers** (e.g. Port 80 for HTTP, 443 for HTTPS, 53 for DNS).

### TCP vs UDP:
- **TCP (Transmission Control Protocol)**: Connection-oriented, reliable, guaranteed in-order delivery, flow control, and congestion control.
- **UDP (User Datagram Protocol)**: Connectionless, unreliable, low-overhead, zero connection latency.

### TCP 3-Way Handshake:
1. **SYN**: Client sends $SYN$ with initial sequence number $ISN_c$.
2. **SYN-ACK**: Server acknowledges with $ACK = ISN_c + 1$ and sends its $SYN$ with $ISN_s$.
3. **ACK**: Client acknowledges with $ACK = ISN_s + 1$.`,
            keyPoints: [
              "TCP uses Additive Increase Multiplicative Decrease (AIMD) to converge on optimal network bandwidth sharing.",
              "UDP is preferred for real-time applications (video streaming, online gaming, VoIP, DNS queries) where speed is valued over guaranteed retransmission."
            ],
            realLifeExample: "TCP is like a recorded registered parcel requiring signature receipt confirmation; UDP is like a public radio broadcast broadcasted blindly.",
            technicalExample: "HTTP/1.1 and HTTP/2 run on TCP; HTTP/3 uses QUIC running on top of UDP for zero round-trip connection handshakes.",
            diagramAscii: `TCP 3-Way Handshake:
Client                               Server
  |                                     |
  | -------- SYN (seq = x) -----------> |  (SYN Received)
  |                                     |
  | <--- SYN-ACK (seq=y, ack=x+1) ----- |  (Server SYN sent)
  |                                     |
  | -------- ACK (seq=x+1, ack=y+1) --> |  (Established)
  v                                     v`,
            formulas: [
              "Estimated RTT: RTT_est = (1 - alpha)*RTT_est + alpha*SampleRTT",
              "AIMD Congestion Window: cwnd = cwnd + 1 (per RTT) on Success; cwnd = cwnd / 2 on Loss"
            ],
            advantages: ["TCP eliminates packet loss with automatic retransmission (ARQ).", "UDP delivers ultra-low latency with minimal 8-byte header overhead."],
            limitations: ["TCP head-of-line blocking stalls stream if a single packet is dropped."],
            applications: ["TCP: Web browsing (HTTPS), Secure Shell (SSH), Email (SMTP/IMAP)", "UDP: DNS lookup, Zoom video calls, Multiplayer gaming"],
            solvedProblem: {
              problemStatement: "In TCP Slow Start, if initial Congestion Window (cwnd) is 1 MSS and threshold ssthresh = 16 MSS, after how many RTTs does cwnd reach 16 MSS?",
              stepByStepSolution: [
                "Slow Start doubles cwnd every RTT (exponential growth).",
                "RTT 0: cwnd = 1 MSS",
                "RTT 1: cwnd = 2 MSS",
                "RTT 2: cwnd = 4 MSS",
                "RTT 3: cwnd = 8 MSS",
                "RTT 4: cwnd = 16 MSS (Reaches ssthresh)."
              ],
              finalAnswer: "It takes 4 RTTs to reach 16 MSS, after which it enters Congestion Avoidance (linear additive increase)."
            },
            codeSnippet: {
              language: "c",
              title: "UDP Client in C",
              code: `#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>

int main() {
    int sockfd = socket(AF_INET, SOCK_DGRAM, 0); // UDP Socket
    struct sockaddr_in servaddr;
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(8080);
    servaddr.sin_addr.s_addr = INADDR_ANY;

    char *msg = "Ping Packet via UDP";
    sendto(sockfd, msg, strlen(msg), 0, (struct sockaddr*)&servaddr, sizeof(servaddr));
    printf("Datagram sent via UDP without handshake!\\n");
    close(sockfd);
    return 0;
}`,
              explanation: "Connectionless UDP datagram transmission with zero handshake setup."
            },
            importantQuestions: [
              {
                question: "Explain the TCP Congestion Control mechanism with phases: Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery.",
                marks: 10,
                answerSummary: "Describe cwnd exponential doubling, ssthresh threshold, linear additive increase, 3 duplicate ACKs triggering Fast Retransmit, and halving of cwnd."
              }
            ],
            vivaQuestions: [
              {
                question: "What is the size of the standard TCP and UDP headers?",
                answer: "TCP header is 20 to 60 bytes (minimum 20 bytes); UDP header is fixed at 8 bytes."
              }
            ],
            quickRevisionPoints: [
              "3-Way Handshake: SYN -> SYN-ACK -> ACK.",
              "TCP is reliable, byte-stream, connection-oriented; UDP is connectionless datagram.",
              "AIMD: Additive Increase on success, Multiplicative Decrease on loss."
            ],
            associatedVisualizer: "network"
          }
        }
      }
    ]
  }
};
