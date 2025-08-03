---
title: C# Unexpected Unique in LINQ
date: 2025-08-03
description: A surprising behavior of the `Except` method in LINQ that treats sequences as sets.
layout: post
tags:
  - C#
  - LINQ
---

## So, What's the Issue?

Short quiz, what do you think the output of the following code will be?

```csharp
int[] numbers1 = { 1,2,2,3,3,3,4,4,4,4,5,5,5,5,5 };
int[] numbers2 = { 4 };

var allExceptNumberTwo = numbers1.Except(numbers2);

foreach (var number in allExceptNumberTwo) {
    Console.WriteLine(number);
}
```

If you guessed that the output would be `[1, 3, 4, 5]`, you are correct. But why is that?

## The Explanation

Lets first look at the [documentation for the `Except`](https://learn.microsoft.com/en-us/dotnet/api/system.linq.queryable.except?view=net-9.0) method in LINQ:

> Queryable.Except Method
>
> ### Definition
>
> Namespace: System.Linq \
> Assemblies: netstandard.dll, System.Linq.Queryable.dll \
> \
> Produces the set difference of two sequences. \
> Produces the set difference of two sequences by using the default equality comparer to compare values.

```csharp
public static System.Linq.IQueryable<TSource> Except<TSource>(this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2);
```

Okay did you catch that? \
The `Except` method is producing the **set** difference of two sequences. \
This means it will return all elements from the first sequence that are not present in the second sequence, treating the sequences as **sets**.

Can this be surprising? Yes, it can be (at least for me, as I ran into this issue)! \
The `Except` method does not consider the number of occurrences of each element in the sequences. \
It only cares about whether an element exists in the second sequence or not. \
Would you catch this if you were just reading the code? Probably not. \
The `Except` method is often used to filter out elements, but it does so in a way that might not be immediately obvious if you're expecting it to behave like a list or array.

## How to Avoid This Issue

To avoid this issue you can use the `Where` method to filter out elements based on a condition, or you can use the `Contains` method to check for the presence of an element in the second sequence.

```csharp
int[] numbers1 = { 1,2,2,3,3,3,4,4,4,4,5,5,5,5,5 };
int[] numbers2 = { 4 };

var allExceptNumberTwo = numbers1
    .Where(number => !numbers2.Contains(number));

foreach (var number in allExceptNumberTwo) {
    Console.WriteLine(number);
}
```

Although this will give you the expected output of `[1, 2, 2, 3, 3, 3, 5, 5, 5, 5, 5]`, it is less efficient than using `Except` because it iterates through the first sequence and checks each element against the second sequence making it `O(N * M)`.

### Making it More Efficient

If you want to further optimize use `HashSet` to store the second sequence:

```csharp
int[] numbers1 = { 1,2,2,3,3,3,4,4,4,4,5,5,5,5,5 };
int[] numbers2 = { 4 };  // [!code --]
var numbers2 = new HashSet<int> { 4 };  // [!code ++]

var allExceptNumberTwo = numbers1
    .Where(number => !numbers2.Contains(number));

foreach (var number in allExceptNumberTwo) {
    Console.WriteLine(number);
}
```

> [!NOTE]
> For `HashSet` the [`Contains` method is `O(1)`](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.hashset-1.contains?view=net-9.0#remarks) on average.

This change makes the overall complexity `O(N * M)` where `M is 1` so it boils down to `O(N)`.
