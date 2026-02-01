"use client";
import { fetchUserLists } from "@/lib/lists";
import React, { useEffect } from "react";

const AllUserLists = () => {
	const [lists, setLists] = React.useState<
		Array<{ id: string; title: string }>
	>([]);

	useEffect(() => {
		(async () => {
			const lists = await fetchUserLists();
			setLists(lists);
		})();
	}, []);
	return lists.length === 0 ? (
		<p>No lists found.</p>
	) : (
		<ul>
			{lists.map((list) => (
				<li key={list.id}>{list.title}</li>
			))}
		</ul>
	);
};

export default AllUserLists;
