import { BlogListing } from "@/components/blog/BlogListing";

export const metadata = {
  title: "Blog — Sky Expo",
  description:
    "مقالات ودلائل عملية حول تصميم الأجنحة، وتنظيم المعارض والمؤتمرات، وأحدث اتجاهات صناعة الفعاليات في السعودية.",
};

export default function BlogPage() {
  return <BlogListing />;
}
