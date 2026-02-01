import NewListForm from "@/components/forms/lists/NewListForm";
import AllUserLists from "@/components/lists/AllUserLists";
import Page from "@/components/Page";
import { Suspense } from "react";

export interface ListProps {
	id: string;
	title: string;
}

const Lists = () => {
	return (
		<Page>
			<h1 className="text-4xl font-black">Lists</h1>

			<section className="mt-8">
				<Suspense fallback={<p>Loading lists...</p>}>
					<AllUserLists />
				</Suspense>
			</section>

			<section>
				<NewListForm />
			</section>
		</Page>
	);
};

export default Lists;
